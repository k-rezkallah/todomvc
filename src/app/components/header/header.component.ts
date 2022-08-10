import { Component } from "@angular/core";
import { TodosService } from "src/app/services/todos.service";

@Component({
    selector: 'app-todos-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent {

    text : string = '';

    constructor  (private todoService : TodosService) {}
    onTextChange(event: Event): void{
        const target = event.target as HTMLInputElement;
        this.text = target.value;
    }

    addtodo() : void {
        this.todoService.addTodo(this.text);
        this.text = ''; 
    }

}