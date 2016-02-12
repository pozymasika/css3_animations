/**
*Animations using native js and CSS3
*/

//event listening helper
function listen(eventTarget, eventName, eventFn) {
  return eventName.split(' ').map(function (evt) {
    if(eventTarget.addEventListener) eventTarget.addEventListener(evt, eventFn, false);
    else if(eventTarget.attachEvent) eventTarget.attachEvent("on" + evt, eventFn);
    else eventTarget["on" + evt] = eventFn;
  });
}

//listen for get started button click
listen(document.querySelectorAll("button")[0], "click", function () {
  var sec = document.querySelectorAll('section')[0];
  var content = document.querySelectorAll('section')[1];
  sec.classList.add('relocate');
  listen(sec, "animationend webkitAnimationEnd msAnimationEnd oanimationend", function () {
    //
    sec.getElementsByTagName("button")[0].style.display = "none";
    content.classList.add('drop');
  })
});

//listen for delete item button click
Array.prototype.slice.call(document.querySelectorAll(".del")).map(function (el) {
  listen(el, "click", function (e) {
    var parent = e.target.parentNode;
    var alert = document.querySelector(".alert");
    alert.classList.add('fadein');
    //if no is clicked we just return
    listen(alert.getElementsByClassName("n")[0], "click", function () {
      alert.classList.remove('fadein');
    });
    //if yes..
    listen(alert.getElementsByClassName("y")[0], "click", function () {
      //hide the alert
      alert.classList.remove('fadein');
      //start the delete animation
      parent.classList.add("delete-anim");
      //
      document.body.setAttribute("style", "background-color:rgba(255, 0, 0, .5)");
      //remove node if animation ends
      listen(parent, "animationend webkitAnimationEnd msAnimationEnd oanimationend", function (e) {
        e.target && e.target.parentNode.removeChild(parent);
        document.body.removeAttribute("style");
      });
      //
    });
    //
  });
});
