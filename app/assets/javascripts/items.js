$(document).on('turbolinks:load', ()=> {
  //投稿枚数制限するために、変数を定義
  let items_images_limit = 11;

  // 画像用のinputを生成する関数
  const buildFileField = (index)=> {
    const html = `<div data-index="${index}" class="review-file_group">
                    <input class="item-file" type="file" name="item[images_attributes][${index}][img]" id="item_images_attributes_${index}_img"><br>
                    <div class="preview-remove">削除</div>
                  </div>`;
    return html;
  } 


  // プレビュー用のimgタグを生成する関数
  const buildImg = (index, url)=> {
    const html = `<img data-index="${index}" src="${url}" class="image-preview" width="100px" height="100px">`;
    return html;
  }

  // file_fieldのnameに動的なindexをつける為の配列
  let fileIndex = [1,2,3,4,5,6,7,8,9,10];
  
  // 既に使われているindexを除外
  lastIndex = $('.review-file_group:last').data('index');
  fileIndex.splice(0, lastIndex);

  $('.hidden-destroy').hide();

  $('#image-box').on('change', '.item-file', function(e) {
    const targetIndex = $(this).parent().data("index");

    // ファイルのブラウザ上でのURLを取得する
    const file = e.target.files[0];
    const blobUrl = window.URL.createObjectURL(file);

    // 該当indexを持つimgタグがあれば取得して変数imgに入れる(画像変更の処理)
    if (img = $(`img[data-index="${targetIndex}"]`)[0]) {
      img.setAttribute('src', blobUrl);
    } else {
    // 新規画像追加の処理
      $('#previews').append(buildImg(targetIndex, blobUrl));

    // fileIndexの先頭の数字を使ってinputを作る
    $('#image-box').append(buildFileField(fileIndex[0]));
    fileIndex.shift();
    
    // 末尾の数に1足した数を追加する
    fileIndex.push(fileIndex[fileIndex.length - 1] + 1)
    }

    // 投稿枚数制限
    if ($(".review-file_group").length >= items_images_limit) {
    alert("これ以上画像投稿できません");
    return false;
    }
  });
  
  $('#image-box').on('click', '.preview-remove', function() {
    const targetIndex = $(this).parent().data('index')
    const hiddenCheck = $(`input[data-index="${targetIndex}"].hidden-destroy`);

    // もしチェックボックスが存在すればチェックを入れる
    if (hiddenCheck) hiddenCheck.prop('checked', true);
    $(this).parent().remove();
    $(`img[data-index="${targetIndex}"]`).remove();

    // 画像入力欄が0個にならないようにしておく
    if ($('.item-file').length == 0) $('#image-box').append(buildFileField(fileIndex[0]));
  });
});