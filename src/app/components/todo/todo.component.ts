import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from "@angular/core";
import { TodosService } from "src/app/services/todos.service";
import { TodosInterface } from "../../types/todos.interface";

@Component({
    selector: 'app-todos-todo',
    templateUrl: './todo.component.html'
})

export class TodoComponent implements OnInit, OnChanges{

    @Input('todo') todoProps! : TodosInterface  ;
    @Input('isEditing') isEditingProps! : boolean;
    @Output('setEditingId') setEditingIdEvent : EventEmitter<string|null> = new EventEmitter(); 
    editingText: string = '';

    @ViewChild('textInput') textInput!: ElementRef ;
    
    constructor(private todoService : TodosService) {}
    
    ngOnInit():void{
        this.editingText = this.todoProps.value;
    }
    ngOnChanges(changes: SimpleChanges) {
        console.log('changes', changes);
        if (changes["isEditingProps"].currentValue) {
          setTimeout(() => {
            this.textInput.nativeElement.focus();
          }, 0);
        }
      }
    
    
    setTodoEditMode(): void {
        //console.log('setTodoEditMode()',this.todoProps.id,'is Editing props', this.isEditingProps)
        //this.textEdit.nativeElement.focuse();
        this.setEditingIdEvent.emit(this.todoProps.id);
    }

    removeTodo(){
        console.log('removeTodo')
        this.todoService.removeTodo(this.todoProps.id);

    }
    toggleTodo(){
        console.log('toggleTodo')
        this.todoService.toggleTodo(this.todoProps.id);
    }

    changeText(event: Event) : void {
        console.log('changeText')
        const changedText = ( event.target as HTMLInputElement).value;
        this.editingText = changedText;

    }
    changeTodo():void{
        console.log('changeTodo', this.editingText);
        this.todoService.changeTodo(this.todoProps.id, this.editingText);
        this.setEditingIdEvent.emit(null);

    }

}