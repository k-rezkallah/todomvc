import { Component } from "@angular/core";
import { map, Observable } from "rxjs";
import { TodosService } from "src/app/services/todos.service";
import { FilterEnum } from '../../types/filter.enum';

@Component({
    selector:'app-todos-footer',
    templateUrl : './footer.component.html'
})
export class FooterComponent {

    noTodoClass$ : Observable<boolean>;
    activeClassCounter : Observable<number>;
    itemLeftLabel : Observable<string>;
    
    filter$: Observable<FilterEnum>;
    filterEnum = FilterEnum ;


    constructor(private todoservice: TodosService){        
        this.noTodoClass$ = this.todoservice.todo$.pipe( map( (todos) => {return todos.length === 0 }));
        this.activeClassCounter = this.todoservice.todo$.pipe(
            map((todos) => todos.filter( (todo) => !todo.isCompleted).length )
        )
        
        this.itemLeftLabel = this.activeClassCounter.pipe(
            map(
                //(activeCount) => `item${activeCount !== 1 ? 's' : ''} left`
                (itemCounter) => `item${itemCounter !== 1 ? 's' : '' } left`
            )
        )
        this.filter$ = this.todoservice.filter$;
    }

    filterClicked(event: Event,  filter: FilterEnum) : void {
        event.preventDefault();
        this.todoservice.changeFilter(filter);
    }

}