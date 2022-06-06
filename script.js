function loadContent () {
  fetch("https://4edo.github.io/cwsh/table.html")
  .then((result) => {
    if (result.status != 200) { throw new Error("Bad Server Response"); }
    return result.text();
  })
  .then((content) => {
    document.getElementById("cwsh_fetchedTable").innerHTML = content;
    
    let selector = document.getElementById("cwsh_cat_praid"); 
  selector.addEventListener("change", () => {
    cwsh_updFields();
  });
     cwsh_updFields(); //first init
  })
  .catch((error) => { console.log(error); });
}
if(document.getElementById('cwsh_fetchedTable')!= null){ 
    console.log("ok");
    loadContent();
}


/**
* Скрытие/демонстрация определённых полей
*/
function cwsh_updFields() {
  let selector = document.getElementById("cwsh_cat_praid"); 
    switch (selector.value) {
      case "thunder":
      case "shadows":
      case "wind":
      case "river":
        $('#table_cwsh_cat_allnames').removeAttr('hidden');
        $('#table_cwsh_cat_name_waterfall').attr('hidden', true);
        $('#cwsh_cat_status').attr('list', 'cwsh_cat_status_list_1');
        break;
        
      case "waterfall":
        $('#table_cwsh_cat_name_waterfall').removeAttr('hidden');
        $('#table_cwsh_cat_allnames').attr('hidden', true);
        $('#cwsh_cat_status').attr('list', 'cwsh_cat_status_list_2');
        break;
        
      default:
        $('#table_cwsh_cat_allnames').attr('hidden', true);
        $('#table_cwsh_cat_name_waterfall').attr('hidden', true);
        $('#cwsh_cat_status').attr('list', 'cwsh_cat_status_list');
    }
}

/**
* Проверяет, все ли важные поля заполнены.
*/
function cwsh_allOk() {
  return document.getElementById("cwsh_cat_name").lenght > 1
      && document.getElementById("cwsh_cat_image1").lenght > 1
      && document.getElementById("cwsh_cat_age").value > 0
      && document.getElementById("cwsh_cat_status").value.lenght > 1
      && document.getElementById("cwsh_cat_account").lenght > 1
      && document.getElementById("cwsh_cat_char").lenght > 1
      && document.getElementById("cwsh_cat_info").lenght > 1
      && document.getElementById("cwsh_cat_img").lenght > 1
}

/**
* Из заполненных полей собирает нужный код.
* Написано НЕ через регулрки, чтобы в случае чего мог поправить и дополнить кто угодно.
*/
function cwsh_generateCode(){
  if(cwsh_allOk()) {
    let prideCode = document.getElementById("cwsh_cat_praid");  // Код племени
    let prideName = document.getElementById("cwsh_cat_praid").selectedOptions[0].text; // Название племени
    let main_name = document.getElementById("cwsh_cat_name").value; // Главное имя кота
    let other_name = ""; // Цепь имён или остаток имени речного (инициализация ниже)
    let full_name = ""; // "хвост" имени речного кота (инициализация ниже)
    let image1 = document.getElementById("cwsh_cat_image1").value; // Первая ссылка на образ
    let image2 = document.getElementById("cwsh_cat_image2").value; // Вторая ссылка на образ
    let cat_age = document.getElementById("cwsh_cat_age").value; // Возраст кота
    let cat_role = document.getElementById("cwsh_cat_status").value; // Должность кота
    let cat_account = document.getElementById("cwsh_cat_account").value; // Профиль кота
    let cat_ank = document.getElementById("cwsh_cat_ank").value; // Анкета кота
    let master_name = document.getElementById("cwsh_cat_master").value; // Имя наставника
    let master_account = document.getElementById("cwsh_cat_master_acc").value; // Ссылка на наставника
    let cat_char = document.getElementById("cwsh_cat_char").value; // Характеристика
    let cat_info = document.getElementById("cwsh_cat_info").value; // Краткое описание
    let cat_img3 = document.getElementById("cwsh_cat_img").value; // Картинка в инфобокс
    let cat_other = document.getElementById("cwsh_cat_other").value; // Прочий текст


    let namesCode = "[b]Занятые имена:[/b]\n"; // Занятые имена
    let imagesCode = "[hr][b]Занятые образы:[/b]\n"; // Занятые образы
    let prideEntityCode = "[hr][b]Список племён:[/b]\n"; // Отпись в племя
    let profileCode = "[hr][b]Оформление профиля:[/b]\n"; // Оформление профиля

    // fill namesCode + prideEntity;
    switch (prideCode.value) {
        case "thunder":
        case "shadows":
        case "wind":
        case "river":
          other_name=document.getElementById("cwsh_cat_allnames").value;
          namesCode += '[code]<tr><td><div class="name">' + main_name.toLowerCase() + '</div></td><td><div class="sheltercat">' + other_name.toLowerCase() + '</div></td></tr>[/code]';

          prideEntityCode += '1. ' + prideName + ' ' + cat_role + '\n';
          prideEntityCode += '2. ' + '[code][url='+ cat_account +']' + main_name.toLowerCase() + '[/url][/code]' +  '\n';
          if(master_name.lenght > 1) {
            prideEntityCode += '3. ' + '[code][url='+ master_account +']'+ master_name.toLowerCase() +'[/url] — [url='+ cat_account +']' + main_name.toLowerCase() + '[/url][/code]' +  '\n';
          }
          break;

        case "waterfall":
          other_name=document.getElementById("cwsh_cat_name_waterfall").value;
          full_name = other_name;
          namesCode += '[code]<tr><td><div class="name"></div></td><td><div class="nameklan"><b>' + main_name.toLowerCase() + ',</b> ' + other_name.toLowerCase() + '</div></td></tr>[/code]';

          prideEntityCode += '1. ' + prideName + ' ' + cat_role + '\n';
          prideEntityCode += '2. ' + '[code][url='+ cat_account +']' + full_name.toLowerCase() + '[/url][/code]' +  '\n';
          if(master_name.lenght > 1) {
            prideEntityCode += '3. ' + '[code][url='+ master_account +']'+ master_name.toLowerCase() +'[/url] — [url='+ cat_account +']' + full_name.toLowerCase() + '[/url][/code]' +  '\n';
          }
          break;

        default:
          other_name=document.getElementById("cwsh_cat_allnames").value;
          namesCode += '[code]<tr><td><div class="name">' + main_name.toLowerCase() + '</div></td><td><div class="sheltercat">' + other_name.toLowerCase() + '</div></td></tr>[/code]';

          prideEntityCode += '1. ' + prideName + '\n';
          prideEntityCode += '2. ' + '[code][url='+ cat_account +']' + main_name.toLowerCase() + '[/url][/code]' + '\n';
      }

    // fill imagesCode
    imagesCode +=  ' [code]<tr><td><div class="name1">'+ main_name.toUpperCase() + " " + full_name + '</div></td><td><div class="model"><a href="' + image1 + '">' + image1 + '</a>';
     if(image2.lenght > 1){
      imagesCode += '<br><a href="' + image2 + '">' + image2 + '</a></div></td></tr>[/code]';
     } else {
      imagesCode += '</div></td></tr>[/code]';
     }

    // fill profileCode
    profileCode += '[b]— племя:[/b] ' + prideName + '[b]\n— должность, возраст:[/b] ' + cat_role + ', ' + cat_age + '\n';
    profileCode += '[code]<br><a href="#tid=заполняет АМС"><img src="/i/blank.gif" onclick="iconRedir(this)" class="infobox"></a> <a href="' + cat_ank + '"><img src="/i/blank.gif" class="anketa"></a>[/code]\n';
    if(prideCode.value == 'waterfall'){
      profileCode += '[code]' + other_name.toLowerCase() + '[/code]';
     }
    profileCode += '[code][mark]О персонаже[/mark][table layout=fixed width=100%][tr][td colspan=1][/td]' + '[td colspan=7 bgcolor=#dcdcd7][align=center][font=yeseva one][size=13]' + cat_char + '[/size][/font]' + '[size=14][b][font=Fixedsys].  .  .  .  .  .  .  .  .  .  .  .[/font][/b][/size][/align][align=center][font=Tahoma]' + cat_info + '[/font][/align][/td]' + '[td colspan=4 bgcolor=#dcdcd7][img]' + cat_img3 + '[/img][align=center][font=yeseva one]' + main_name + '[/font][/align][/td]' + '[td colspan=1][/td][/tr][tr][td colspan=1][/td][td colspan=11 bgcolor=#eee9e3][align=center][font=Tahoma]' + cat_other + '[/font][/align][/td]' + '[td colspan=1][/td][/tr][tr][td colspan=1][/td][td colspan=11 bgcolor=#dcdcd7][/td][td colspan=1][/td][/tr][/table][/code]';

    cwsh_sendGeneratedCode(namesCode + "\n" + imagesCode  + "\n" +  prideEntityCode + "\n" + profileCode);
  } else {
    alert('Не все поля заполнены!');
  }
}

/**
* Вставляет в форму ответа сгенерированный код и имитирует клик на кнопку "Отправить"
*/
function cwsh_sendGeneratedCode(code){
  document.getElementById("main-reply").value=code;
document.getElementsByName("submit")[0].click();
}
