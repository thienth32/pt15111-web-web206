window.SystemCore = {
    baseApiUrl: 'https://5f1a7522610bde0016fd292f.mockapi.io/hotels',
    fetchData: function(){
        fetch(this.baseApiUrl)
        .then(function (response){
            return response.json();
        })
        .then(function(data) {
            if(data.length > 0){
                let content = ``;
                data.map(function(item, index){
                    content += `<tr id="data-${item.id}">
                                    <td>${item.id}</td>
                                    <td>${item.name}</td>
                                    <td>
                                        <img src="${item.logo}" width="50"/>
                                    </td>
                                    <td>${item.address}</td>
                                    <td>
                                        <button type="button" 
                                            class="btn btn-danger btn-sm"
                                            onclick="SystemCore.removeHotel(${item.id})">Xóa</button>
                                        &nbsp;
                                        <a href="edit.html?id=${item.id}" 
                                            class="update-hotel-modal btn btn-info btn-sm"
                                            >Sửa</a>
                                    </td>
                                    

                                </tr>`;                
                });

                document.querySelector('tbody').innerHTML = content;
            }
        })
    },
    removeHotel: function(hotelId){
        // gửi request để xóa dữ liệu từ mockapi
        let removeUrl = `${this.baseApiUrl}/${hotelId}`;
        fetch(removeUrl, {method: "DELETE"})
        .then(response => response.json())
        .then(data => {
            console.log(data);
            // xóa dom trên trình duyệt
            document.querySelector(`#data-${data.id}`).remove();
        });
    }
}