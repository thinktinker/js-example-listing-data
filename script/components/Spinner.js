/*
<div id="testSpinner" class="spinner-border spinner-border-sm d-none" role="status">
</div>
*/

class Spinner{

    constructor(element){
        this.element = element;
        this.spinner = null;
    }

    createSpinner(){
        this.spinner = document.createElement("div");
        this.spinner.className = "spinner-border spinner-border-sm d-none";
        this.spinner.setAttribute("role", "status");
        this.element.prepend(this.spinner);
        return;
    }

    displaySpinner(status=false){
        if(status)
            this.spinner.classList.remove("d-none");
        else
            this.spinner.classList.add("d-none");

        return;
    }
}