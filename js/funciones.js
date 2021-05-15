

$("#btn_limpiar").click(function() {
    
        $('#txt_rut').val('');
        $('#txt_nombre').val('');
        $('#txt_appaterno').val('');
        $('#txt_apmaterno').val('');
        $('#txt_correo').val('');
        $('#txt_rut').removeClass('is-valid')
        $('#txt_rut').removeClass('is-invalid')

        $('#txt_nombre').removeClass('is-valid')
        $('#txt_nombre').removeClass('is-invalid')

        $('#txt_appaterno').removeClass('is-valid')
        $('#txt_appaterno').removeClass('is-invalid')

        $('#txt_apmaterno').removeClass('is-valid')
        $('#txt_apmaterno').removeClass('is-invalid')

        $('#txt_correo').removeClass('is-valid')
        $('#txt_correo').removeClass('is-invalid')

        $('#errores').text('')
    }); 

$("#btn_registro").click(function() {
        
        $("#errores").empty();

         /***********Consumir API de RUT************ */
        $.getJSON('https://api.libreapi.cl/rut/validate' , {rut: $('#txt_rut').val()},function(data) {
            var respuesta = data;
            var valido = respuesta.data.valid;
            if (valido){
                $('#txt_rut').addClass('is-valid')
                $('#txt_rut').removeClass('is-invalid')

            } else{
                $('#errores').append('<li> RUT inválido, corríjalo para continuar.');
                $('#txt_rut').addClass('is-invalid');
                $('#txt_rut').removeClass('is-valid');
                }   
            }).fail(function() {
                $('#errores').append('<li> RUT inválido, corríjalo para continuar.');
                $('#txt_rut').addClass('is-invalid');
                $('#txt_rut').removeClass('is-valid');
                
            });
    
        
        /*************Validadores de contenido**********************/
        usuario = $("#txt_nombre").val();
        if(usuario == "") {
                validador = 1;
                $("#errores").append('<li> Debe ingresar un nombre </li>');
                $('#txt_nombre').removeClass('is-valid')
                $('#txt_nombre').addClass('is-invalid');
        }
        else{  
                $('#txt_nombre').removeClass('is-invalid')
                $('#txt_nombre').addClass('is-valid');
        };

        apellido1 = $("#txt_appaterno").val();
        if(apellido1 == "") {
                validador = 1;
                $("#errores").append('<li> Debe ingresar el apellido paterno </li>');
                $('#txt_appaterno').removeClass('is-valid')
                $('#txt_appaterno').addClass('is-invalid');
        }else{  
                $('#txt_appaterno').removeClass('is-invalid')
                $('#txt_appaterno').addClass('is-valid');
        };

        apellido2 = $("#txt_apmaterno").val();
        if(apellido2 == "") {
                validador = 1;
                $("#errores").append('<li> Debe ingresar el apellido materno </li>');
                $('#txt_apmaterno').removeClass('is-valid')
                $('#txt_apmaterno').addClass('is-invalid');
        }else{  
                $('#txt_apmaterno').removeClass('is-invalid')
                $('#txt_apmaterno').addClass('is-valid');
        };


        mail = $("#txt_correo").val();
        if(mail == "") {
                validador = 1;
                $("#errores").append('<li> Debe ingresar un mail </li>');
                $('#txt_correo').removeClass('is-valid')
                $('#txt_correo').addClass('is-invalid');
        }else{  
                $('#txt_correo').removeClass('is-invalid')
                $('#txt_correo').addClass('is-valid');
        };


       
        
    });

/******Notificacion temporal****** */
function mensaje(){
    if( $('#errores').text()==""){
        $('.toast').toast({ delay: 8000 });
        $('.toast').toast('show');
        
    }
  
}

/*funcion para indicadores económicos*/
function indicadoresEconomicos(){

    $.getJSON('https://api.libreapi.cl/economy/indicators',function(data) {
            var respuesta = data;
            var uf = respuesta.data.uf;
            var dolar = respuesta.data.dolar;
            var euro = respuesta.data.euro;
            $('#txt_movimiento').text( 'Dólar:$' + dolar + ' - Euro:$' + euro + ' - UF:$' + uf)
            });
}

/*funcion para temperatura*/
function cargarTemperatura(){

    $.getJSON('https://api.libreapi.cl/weather/stations', {code: "330020"},function(data) {
            var respuesta = data;
            var temperatura = respuesta.data.temperature;
            
            $('#lbl_temperatura').text('La temperatura actual en Santiago es: ' + temperatura + ' °C')
            });
}