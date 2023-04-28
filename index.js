// Validator function
function Validator(options){

    function validate(inputELement, element){
        // Lấy phần tử form-group
        const formGroupElement = inputELement.parentElement;
        const errorMessage = formGroupElement.querySelector(options.errorSelector);
        // Truyền dữ liệu input sang hàm check
        const resultCheck = element.check(inputELement.value);

        if(resultCheck){
            formGroupElement.classList.add('invalid');
            errorMessage.innerHTML = resultCheck;
        }else{
            formGroupElement.classList.remove('invalid');
            errorMessage.innerHTML = '';
        }
    }

    // Lấy phần tử form
    const formElement = document.querySelector(options.form);
    // Lặp qua các rules
    options.rules.forEach(element=>{
        // lấy input
        const inputELement = formElement.querySelector(element.selector);
        // Sự kiện
        inputELement.onblur = ()=>{
            validate(inputELement, element);
        }
        inputELement.oninput = ()=>{
            validate(inputELement, element);
        }
    });
}

// Định nghĩa các rule
Validator.isRequired = (selector)=>{
    return {
        selector,
        check: (value)=>{
            return value ? undefined : 'Vui lòng nhập trường này!';
        }
    }
}

Validator.isEmail = (selector)=>{
    return {
        selector,
        check: (value)=>{
            var emailRegex = /\S+@\S+\.\S+/;
            if(value.trim()){
                return emailRegex.test(value) ? undefined : 'Email không đúng dịnh dạng!';
            }
        }
    }
}

Validator.minLength = (selector, min)=>{
    return {
        selector,
        check: (value)=>{
            return value.length < min ? `Tối thiểu ${min} kí tự!` : undefined;
        }
    }
}