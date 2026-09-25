---
layout: single
title: "WinForms에서 버튼을 누르면 화면이 멈추는 이유"
categories: ["C#"]
date: 2026-09-25
permalink: /csharp/winforms-ui-thread-async-await/
excerpt: "UI 스레드가 멈추는 상황을 재현하고, async/await와 Task.Run을 작업 성격에 맞게 사용하는 방법을 정리합니다."
---

WinForms에서 조회 버튼을 누른 뒤 창을 움직일 수 없거나, 진행 상태가 작업이 끝난 뒤에야 바뀌는 경우가 있습니다. 작업 자체가 실패한 것은 아니어도 사용자에게는 프로그램이 멈춘 것처럼 보입니다.

이 문제를 이해하려면 **작업을 기다리는 동안 UI 스레드가 무엇을 하고 있는지**를 살펴봐야 합니다. 간단한 예제로 멈춤을 재현한 뒤, 대기와 계산을 나누어 수정해 보겠습니다.

예제는 **Windows와 .NET 10 WinForms** 기준입니다. 2026년 9월 25일 기준 최신 정식 메이저 버전은 .NET 10이며, .NET 11은 RC 단계입니다. 설치할 때는 [.NET 10 다운로드 페이지](https://dotnet.microsoft.com/en-us/download/dotnet/10.0)의 최신 서비스 패치가 포함된 SDK를 사용하면 됩니다.

## 1. UI 스레드는 화면도, 이벤트도 처리한다

일반적인 WinForms 프로그램은 UI 스레드에서 메시지 루프를 실행합니다. 버튼 클릭뿐 아니라 키보드 입력과 화면 다시 그리기 같은 요청도 이 흐름에서 처리됩니다.

버튼의 클릭 이벤트 안에서 오래 걸리는 동기 작업을 수행하면, UI 스레드는 그 작업이 끝날 때까지 다음 메시지를 처리할 수 없습니다.

```csharp
private void LoadButton_Click(object? sender, EventArgs e)
{
    statusLabel.Text = "조회 중...";
    Thread.Sleep(3000);
    statusLabel.Text = "완료";
}
```

`Text` 속성에 값을 넣었다고 해서 그 순간 화면의 픽셀이 모두 다시 그려지는 것은 아닙니다. 위 코드에서는 중간 상태인 “조회 중...”을 제대로 보여주기도 전에 UI 스레드가 잠들 수 있습니다.

`Thread.Sleep`을 사용한 이유는 증상을 쉽게 재현하기 위해서입니다. 동기 네트워크 요청이나 무거운 반복문도 UI 스레드를 오래 점유하면 같은 문제가 생깁니다. 메시지 루프와 비동기 대기의 관계는 [Microsoft의 UI 교착 상태 설명](https://devblogs.microsoft.com/dotnet/await-and-ui-and-deadlocks-oh-my/)에서도 확인할 수 있습니다.

## 2. 직접 비교해 보기

Windows 터미널에서 프로젝트를 만듭니다.

```powershell
dotnet new winforms -n UiFreezeDemo -f net10.0
cd UiFreezeDemo
```

생성된 프로젝트의 `TargetFramework`는 `net10.0-windows`입니다. `Program.cs`를 아래 코드로 교체합니다. 화면을 코드로 구성하므로 디자이너에 컨트롤을 추가할 필요는 없습니다. 템플릿이 만든 `Form1` 파일들은 이 예제에서 사용하지 않습니다.

```csharp
using System;
using System.Drawing;
using System.Threading;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace UiFreezeDemo;

internal static class Program
{
    [STAThread]
    private static void Main()
    {
        ApplicationConfiguration.Initialize();
        Application.Run(new MainForm());
    }
}

internal sealed class MainForm : Form
{
    private readonly Button blockingButton = new()
    {
        Text = "동기 대기", AutoSize = true
    };
    private readonly Button asyncButton = new()
    {
        Text = "비동기 대기", AutoSize = true
    };
    private readonly Label statusLabel = new()
    {
        Text = "버튼을 눌러 비교하세요.", AutoSize = true
    };
    private bool isBusy;

    public MainForm()
    {
        Text = "UI 스레드 비교";
        ClientSize = new Size(420, 180);

        var panel = new FlowLayoutPanel
        {
            Dock = DockStyle.Fill,
            FlowDirection = FlowDirection.TopDown,
            Padding = new Padding(16)
        };
        panel.Controls.AddRange([blockingButton, asyncButton, statusLabel]);
        Controls.Add(panel);

        blockingButton.Click += (_, _) =>
        {
            SetBusy(true);
            Thread.Sleep(3000);
            SetBusy(false);
        };

        asyncButton.Click += async (_, _) =>
        {
            SetBusy(true);
            try
            {
                await Task.Delay(3000);
            }
            finally
            {
                SetBusy(false);
            }
        };

        // 비교 중에는 폼이 닫히지 않게 해 완료 후 컨트롤 접근을 보장합니다.
        FormClosing += (_, e) => e.Cancel = isBusy;
    }

    private void SetBusy(bool busy)
    {
        isBusy = busy;
        blockingButton.Enabled = !busy;
        asyncButton.Enabled = !busy;
        statusLabel.Text = busy ? "3초 대기 중..." : "완료";
    }
}
```

```powershell
dotnet run
```

두 버튼을 각각 누른 뒤 창을 움직이거나 크기를 바꿔봅니다.

| 동작 | 동기 대기 | 비동기 대기 |
|---|---|---|
| 약 3초 동안 기다리기 | 동일 | 동일 |
| 기다리는 동안 화면 다시 그리기 | 지연됨 | 계속 가능 |
| 작업 버튼 다시 누르기 | 비활성화 | 비활성화 |
| 작업 중 폼 닫기 | 처리 자체가 지연될 수 있음 | 예제에서 닫기 거부 |

동기 대기 중 누른 닫기 요청은 작업이 끝난 뒤 처리될 수도 있습니다. 실무 프로그램에서는 작업 취소와 폼 종료 정책을 따로 정해야 합니다.

이 예제의 확인 기준은 **작업 시간이 짧아지는지**가 아니라 **같은 시간 동안 기다려도 화면이 반응하는지**입니다. `Task.Delay`는 비교를 위한 타이머 대기이며, 실제 조회를 빠르게 만들어주는 코드는 아닙니다.

## 3. async를 붙이면 새 스레드가 생길까?

`async`는 메서드 안에서 `await`를 사용할 수 있게 해줍니다. 메서드 전체를 자동으로 다른 스레드에서 실행해주는 키워드는 아닙니다.

```csharp
private async Task<string> LoadDataAsync()
{
    Thread.Sleep(3000);     // 호출한 스레드를 그대로 막습니다.
    await Task.Delay(100);
    return "완료";
}
```

이 메서드를 UI 스레드에서 호출하면 첫 3초는 여전히 멈춥니다. 비동기 메서드는 처음부터 실행되며, **아직 완료되지 않은 작업을 `await`할 때** 호출자에게 제어를 돌려줄 수 있습니다. 이미 완료된 작업을 `await`하면 곧바로 다음 줄을 실행할 수도 있습니다. [C# 비동기 프로그래밍 문서](https://learn.microsoft.com/en-us/dotnet/csharp/asynchronous-programming/)가 설명하는 핵심 동작입니다.

위의 비동기 버튼 예제는 WinForms 이벤트에서 시작했으므로 `await` 뒤에 캡처한 UI 컨텍스트로 돌아와 `SetBusy(false)`를 실행합니다. 이 흐름에서는 컨트롤을 바꾸려고 다시 `Invoke`할 필요가 없습니다.

## 4. I/O 작업과 CPU 작업을 나누기

작업이 무엇을 기다리는지에 따라 방법이 달라집니다.

| 작업 | 기본 접근 |
|---|---|
| HTTP 요청, 비동기를 지원하는 DB 조회, 파일 읽기 | 해당 비동기 API를 `await` |
| 큰 데이터 변환, 이미지 계산 등 CPU를 오래 사용하는 연산 | UI에서 값을 꺼낸 뒤 `Task.Run`으로 계산 |
| 컨트롤 속성 읽기·쓰기 | UI 스레드에서 처리 |

### I/O는 제공되는 비동기 API 사용하기

HTTP 요청은 다음처럼 호출합니다. `httpClient`는 매번 생성하지 않고 재사용하는 인스턴스라고 가정합니다.

```csharp
string text = await httpClient.GetStringAsync(uri, cancellationToken);
resultTextBox.Text = text;
```

이미 비동기를 지원하는 요청을 `Task.Run`으로 한 번 더 감쌀 필요는 보통 없습니다. 아래 코드는 비동기 요청을 호출하기 위해 스레드 풀 작업까지 추가합니다.

```csharp
// 이 경우에는 Task.Run 없이 바로 await하면 됩니다.
string text = await Task.Run(() => httpClient.GetStringAsync(uri));
```

### CPU 연산은 계산 부분을 분리하기

작은 합계 계산으로 구조를 확인해 보겠습니다. 아래 코드는 앞의 `MainForm` 클래스 안에 추가할 수 있는 예제입니다.

```csharp
private static long CalculateSum(int count)
{
    ArgumentOutOfRangeException.ThrowIfNegative(count);

    long sum = 0;
    for (int i = 0; i < count; i++)
        sum += i;

    return sum;
}

private async Task ShowSumAsync()
{
    System.Diagnostics.Debug.Assert(CalculateSum(10) == 45);

    long sum = await Task.Run(() => CalculateSum(100_000_000));
    statusLabel.Text = $"합계: {sum:N0}";
}
```

앞의 비동기 버튼에서 `await Task.Delay(3000)`을 `await ShowSumAsync()`로 바꾸면 계산 예제를 확인할 수 있습니다. 계산 시간은 PC마다 다릅니다. 반복문은 CPU 작업 설명용이며, 이 합계만 필요하다면 실제 제품에서는 수식을 쓰는 편이 낫습니다.

`Task.Run` 내부에서는 UI 컨트롤에 접근하지 않습니다. 계산에 필요한 입력은 UI 스레드에서 미리 읽고, 계산 결과를 `await`한 다음 화면에 반영합니다. [Microsoft의 비동기 시나리오 문서](https://learn.microsoft.com/en-us/dotnet/csharp/asynchronous-programming/async-scenarios)는 이러한 I/O·CPU 작업 구분을 설명합니다.

## 5. .Result와 .Wait()가 위험한 이유

비동기 메서드를 호출해 놓고 UI 스레드에서 동기적으로 기다리면 다시 문제가 생깁니다.

```csharp
// UI 이벤트 안에서는 이런 동기 대기를 피합니다.
string result = LoadDataAsync().Result;
```

호출한 메서드가 UI 컨텍스트를 캡처했다면 다음 상황이 가능합니다.

1. UI 스레드는 `.Result`에서 메서드 완료를 기다립니다.
2. 메서드는 `await` 다음 코드를 UI 스레드에서 실행하려 합니다.
3. UI 스레드가 막혀 있어 다음 코드를 실행하지 못합니다.

서로를 기다리는 교착 상태입니다. 모든 `.Result` 호출이 반드시 교착 상태를 만드는 것은 아니지만, UI 스레드를 막는다는 점만으로도 피할 이유가 충분합니다. `.Wait()`나 `.GetAwaiter().GetResult()`로 바꿔도 동기 대기라는 본질은 같습니다.

호출하는 이벤트까지 비동기로 이어서 `await`해야 합니다. `ConfigureAwait(false)`를 여기저기 붙여 우회하면 UI로 돌아온다는 보장까지 사라지므로, 컨트롤을 갱신하는 이벤트 코드의 해결책으로 사용하지 않습니다.

## 6. InvokeAsync는 언제 필요할까?

장비 통신 콜백이나 별도 작업 스레드처럼 **이미 UI 밖에서 실행 중인 코드**가 화면에 접근해야 할 때 사용합니다. .NET 9부터 제공되는 `Control.InvokeAsync`는 .NET 10에서도 사용할 수 있습니다. [WinForms 공식 문서](https://learn.microsoft.com/en-us/dotnet/desktop/winforms/controls/how-to-make-thread-safe-calls)에 버전과 사용 방법이 정리되어 있습니다.

```csharp
// 폼이 살아 있고 handle이 생성된 상태에서 호출합니다.
await statusLabel.InvokeAsync(() =>
{
    statusLabel.Text = "수신 완료";
});
```

여기에는 짧은 UI 갱신만 넣습니다. 무거운 계산을 `InvokeAsync` 안에 넣으면 그 계산도 UI 스레드에서 실행되어 다시 화면을 막습니다. 콜백은 폼 종료 시 구독을 해제하고, 종료 이후에는 화면 갱신을 요청하지 않도록 수명도 함께 관리해야 합니다.

실제 HTTP·DB 작업에는 예외가 생길 수 있으므로 이벤트 핸들러에서 `try/catch/finally`로 오류 표시와 버튼 복구를 처리해야 합니다. `async void`는 이벤트 핸들러에 한정하고, 내부 작업 메서드는 `Task` 또는 `Task<T>`를 반환하면 완료와 예외를 호출자가 관찰할 수 있습니다.

이 흐름을 실제 외부 API 호출에 적용한 예제는 [C#으로 오류 로그를 요약해주는 AI 도구 만들기]({{ '/ai/winforms-ai-log-summarizer/' | relative_url }})에서 이어집니다.
