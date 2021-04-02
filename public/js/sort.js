export default {
  install: function() {
    document.querySelectorAll(".sortable").forEach(function(v, i) {
      v.addEventListener("click", function() {
        getSiblings(v);
        let sortby = "";
        if (v.classList.contains("asort")) {
          v.classList.remove("asort");
          v.classList.add("dsort");
          sortby = "desc";
        } else {
          v.classList.add("asort");
          v.classList.remove("dsort");
          sortby = "asc";
        }
        let page = 1;
        let sortcol = v.getAttribute("data-type");
        paginate.sort(page, sortcol, i + 1, sortby);
      });
    });

    let getSiblings = function(elem) {
      let siblings = [];
      let sibling = elem.parentNode.firstChild;
      for (; sibling; sibling = sibling.nextSibling) {
        if (sibling.nodeType !== 1 || sibling === elem) continue;
        sibling.classList.remove("asort");
        sibling.classList.remove("dsort");
        siblings.push(sibling);
      }
      return siblings;
    };
  },
};
