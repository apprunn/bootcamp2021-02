import {appendSong,removeSong,getSongs,findSong,updateSong} from './models/Song.js'

window.onload = function () {
    var btnAdd = document.querySelector("#btn-add"),
    index = null;

    btnAdd.addEventListener('click', function () {
        saveData(null)
    });
    loadData(getSongs(),false);

    const getForm= (index=null) =>{
        var title = index==null ?document.getElementById("title"):document.getElementById("title-"+index),
        singer = index==null ?document.getElementById("singer"):document.getElementById("singer-"+index),
        price = index==null ?document.getElementById("price"):document.getElementById("price-"+index),
        country = index==null ?document.getElementById("country"):document.getElementById("country-"+index),
        url = index==null ?document.getElementById("url"):document.getElementById("url-"+index);
        return {title: title.value, singer: singer.value, price: price.value, country: country.value,url: url.value}
    };
    const saveData = (index=null) => {
        const song = getForm(index);
        index !=null?updateData():appendSong(song);
        loadData(getSongs());
        clearData();
    }

    const removeData = (i) => {
        if(removeSong(i)){
            loadData(getSongs());
        }
    }
    const updateData = (index) => {
        const song = getForm(index);
        updateSong(index,song);
        DataInfo(index);
    }
    function loadData(data) {
        var songs = data, gridBody = document.querySelector("#grid tbody");
        // Draw TR from TBODY
        gridBody.innerHTML = '';
        songs.forEach(function (x, i) {
            var tr = document.createElement("tr"),
                tdtitle = document.createElement("td"),
                tdsinger = document.createElement("td"),
                tdprice = document.createElement("td"),
                tdcountry = document.createElement("td"),
                tdurl = document.createElement("td"),
                tdRemove = document.createElement("td"),
                tdEdit = document.createElement("td"),
                btnRemove = document.createElement("button"),
                btnEdit = document.createElement("button"),
                btnDetail = document.createElement("button"),
                inputTitle = document.createElement("input"),
                inputSinger = document.createElement("input"),
                inputPrice = document.createElement("input"),
                inputCountry = document.createElement("input"),
                inputUrl = document.createElement("input"),
                iconShow = document.createElement("i"),
                iconSave = document.createElement("i"),
                iconDelete = document.createElement("i");

            //icons
            iconShow.className = "bi bi-eye"
            iconSave.className = "bi bi-check-circle"
            iconDelete.className = "bi bi-trash"
            //inputs
            inputTitle.className = "form-control";
            inputTitle.id = "title-"+i;
            inputTitle.value = x.title;
            tdtitle.appendChild(inputTitle);

            inputSinger.className = "form-control";
            inputSinger.id = "singer-"+i;
            inputSinger.value = x.singer;
            tdsinger.appendChild(inputSinger);

            inputPrice.className = "form-control";
            inputPrice.id = "price-"+i;
            inputPrice.value = x.price;
            tdprice.appendChild(inputPrice);

            inputCountry.className = "form-control";
            inputCountry.id = "country-"+i;
            inputCountry.value = x.country;
            tdcountry.appendChild(inputCountry);

            inputUrl.className = "form-control";
            inputUrl.id = "url-"+i;
            inputUrl.value = x.url;
            tdurl.appendChild(inputUrl);

            btnRemove.className = 'btn btn-sm btn-danger mr-1';
            btnRemove.addEventListener('click', function(){
                removeData(i);
            });
            btnRemove.appendChild(iconDelete);
            btnEdit.className = 'btn btn-sm btn-success mr-1';
            btnEdit.addEventListener('click', function(){
                updateData(i);
            });
            btnEdit.appendChild(iconSave);
            btnDetail.className = 'btn btn-sm btn-info mr-1';
            btnDetail.addEventListener('click', function(){
                DataInfo(i);
            });
            btnDetail.appendChild(iconShow);
            tdRemove.appendChild(btnEdit);
            tdRemove.appendChild(btnRemove);
            tdRemove.appendChild(btnDetail);
            tr.appendChild(tdtitle);
            tr.appendChild(tdsinger);
            tr.appendChild(tdprice);
            tr.appendChild(tdcountry);
            tr.appendChild(tdurl);
            tr.appendChild(tdRemove);
            gridBody.appendChild(tr);
        });
    }
    const DataInfo = (i) =>{
        const song = findSong(i);
        document.getElementById("card-title").innerHTML = song.title;
        document.getElementById("card-singer").innerHTML = song.singer;
        document.getElementById("card-price").innerHTML = "$  "+song.price;
        document.getElementById("card-country").innerHTML = song.country;
        document.getElementById("card-url").src = song.url;
    }
    const clearData =()=>{
        document.getElementById("title").value = "";
        document.getElementById("singer").value = "";
        document.getElementById("price").value = "";
        document.getElementById("country").value = "";
        document.getElementById("url").value = "";
    }
}