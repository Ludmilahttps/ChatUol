function getName() {
    alert("oi");
    const section = document.querySelector('.section');
    const aux = document.querySelector('.login-overlay');
    aux.classList.add('none');

    let inputName = document.querySelector("#input-login");
    let name = inputName.value;
    alert(name);
}