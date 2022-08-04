const socket = io();
const time = new Date();

const codigoTable = `{{#if length}}
                    <table>
                        <tr>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Imagen</th>
                        </tr>
                        {{#each contenedor}}
                        <tr>
                            <td>{{this.title}}</td>
                            <td>{{this.price}}</td>
                            <td><img src={{this.thumbnail}} width="100" height="100"></td>
                        </tr>
                        {{/each}}
                    </table>
                    {{else}}
                    <h3>No se encontraron Productos</h3>
                    {{/if}}`;

const codigoChat = `{{#each chat}}
                    <div class='messegeText'>
                        <strong>{{this.email}}</strong>
                        <p>{{this.time}}</p>
                        <i>{{this.message}}</i>
                    </div>
                    {{/each}}`
                
const templateTable = Handlebars.compile(codigoTable);
const templateChat = Handlebars.compile(codigoChat);

socket.on('productos', data=>{
    const html = templateTable({contenedor: data.contenedor,length: data.length});
    document.getElementById('tableProduct').innerHTML = html;
})

socket.on('messages',data=>{
    const html = templateChat({chat:data})
    document.getElementById('chatMessage').innerHTML = html;
})


//EVENT
const btnSubmit = document.getElementById('btnSubmit');
btnSubmit.addEventListener("click",()=>{
    const producto = {
        title: document.getElementById('title').value,
        price: document.getElementById('price').value,
        thumbnail: document.getElementById('thumbnail').value,
    };
    socket.emit('newProducto',producto);
    document.getElementById('title').value =''
    document.getElementById('price').value =''
    document.getElementById('thumbnail').value =''
});

const btnNewMessage = document.getElementById('btnNewMessage');
btnNewMessage.addEventListener("click", ()=>{
    const email = document.getElementById('email').value;
    if (email ==""){
        alert("Debe ingresar email")
    }else{
        const message = {
            email: document.getElementById('email').value,
            time: time.toLocaleString(),
            message: document.getElementById('message').value,
        }
        socket.emit('newMessage',message)
    }
})