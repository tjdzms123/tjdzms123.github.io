---
title: "Windows"
layout: archive
permalink: /windows/
author_profile: true
---

{% assign posts = site.posts | where_exp: "post", "post.categories contains 'Windows'" %}
{% if posts.size == 0 %}
  <p>아직 작성된 글이 없습니다.</p>
{% else %}
  {% for post in posts %}
    {% include archive-single.html %}
  {% endfor %}
{% endif %}
