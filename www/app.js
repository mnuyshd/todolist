$(document).on('init', '#list-page', function(event) {
  //localStorage.removeItem('todo-list');
  var saveList = JSON.parse(localStorage.getItem('todo-list'));
  if (saveList == null) {
    saveList = [];
  }
  saveList.forEach(function(data) {
    var item = 
      '<ons-list-item modifier="chevron" class="item">' +
        '<ons-row>' +
          '<ons-col id="no" style="display:none">' + data.no + '</ons-col>' +
          '<ons-col id="title">' + data.title + '</ons-col>' +
        '</ons-row>' +
        '<ons-row>' +
          '<ons-col id="contents">' + data.contents + '</ons-col>' +
      '</ons-list-item>';
    $('#todo-list').append(item);
  });
});

$(document).on('click', '#add-button', function() {
  var navigator = document.querySelector('#navigator');
  navigator.pushPage('edit.html', {data: {no: -1, title: '', contents: ''}});
});

$(document).on('click', '.item', function() {
  var no = $(this).find('#no').html();
  var title = $(this).find('#title').html();
  var contents = $(this).find('#contents').html();
  var navigator = document.querySelector('#navigator');
  navigator.pushPage('edit.html', {data: {no: no, title: title, contents: contents}});
});

$(document).on('init', '#edit-page', function(event) {
  var page = event.target;
  $('#title-text').val(page.data.title);
  $('#no-hidden').val(page.data.no);
  $('#contents-textarea').val(page.data.contents);
  if (page.data.no == '-1') {
    $('#delete-button').attr('disabled', true);
  }
});

$(document).on('click', '#save-button', function() {
  var saveList = JSON.parse(localStorage.getItem('todo-list'));
  if (saveList == null) {
    saveList = [];
  }
  var title = $('#title-text');
  var no = $('#no-hidden').val();
  var contents = $('#contents-textarea');
  if (no == '-1') {
    saveList.push({
      no: saveList.length,
      title: $(title).val(),
      contents: $(contents).val()
    });
  } else {
    saveList[no].title = $(title).val();
    saveList[no].contents = $(contents).val();
  }
  localStorage.setItem('todo-list', JSON.stringify(saveList));
  var navigator = document.querySelector('#navigator');
  navigator.popPage();
  location.reload();
});

$(document).on('click', '#delete-button', function() {
  var saveList = JSON.parse(localStorage.getItem('todo-list'));
  var no = $('#no-hidden').val();
  saveList.splice(no, 1);
  localStorage.setItem('todo-list', JSON.stringify(saveList));
  var navigator = document.querySelector('#navigator');
  navigator.popPage();
  location.reload();
});

if (ons.platform.isIPhoneX()) {
  document.documentElement.setAttribute('onsflag-iphonex-portrait', '');
  document.documentElement.setAttribute('onsflag-iphonex-landscape', '');
}
