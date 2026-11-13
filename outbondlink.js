(function () {
  "use strict";

  function renderOutboundLinks() {
    document.querySelectorAll("span.ob[data-ob]").forEach(function (source) {
      var url;
      try {
        url = new URL(atob(source.getAttribute("data-ob")));
      } catch (error) {
        return;
      }
      if (url.protocol !== "https:") return;
      var link = document.createElement("a");
      link.href = url.href;
      link.target = "_blank";
      link.rel = "nofollow noopener noreferrer";
      link.className = source.className.replace(/\bob\b/g, "").trim();
      Array.from(source.attributes).forEach(function (attribute) {
        if (["class", "data-ob", "data-ob-label"].indexOf(attribute.name) === -1) {
          link.setAttribute(attribute.name, attribute.value);
        }
      });
      link.append.apply(link, Array.from(source.childNodes));
      source.replaceWith(link);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", renderOutboundLinks);
  } else {
    renderOutboundLinks();
  }
}());
