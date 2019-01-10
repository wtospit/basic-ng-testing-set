import { TodosComponent } from './todos.component'; 
import { TodoService } from './todo.service'; 
import { of, empty, throwError } from 'rxjs';

describe('TodosComponent', () => {
  let component: TodosComponent;
  let service: TodoService;

  beforeEach(() => {
    service = new TodoService(null);
    component = new TodosComponent(service);
  });

  it('should set todos property with the item returned from service', () => {
    let todos = [1,2,3];
    spyOn(service, "getTodos").and.callFake(() => {
      return of(todos)
    });

    component.ngOnInit();

    expect(component.todos.length).toBe(3)
    expect(component.todos).toEqual(todos);
  });

  it("should call the server to save the changes when a new todo item is added", () => {
    spyOn(service, "add").and.callFake((t) => {
      return empty();
    });

    component.add();

    expect(service.add).toHaveBeenCalled();
  });

  it("should add the new todo returned from the server", () => {
    let todo = { id: 1}; 
    // spyOn(service, "add").and.callFake((t) => {
    //   return of(todo);
    // });
    spyOn(service, "add").and.returnValue(of(todo));

    component.add();

    expect(component.todos.indexOf(todo)).toBeGreaterThan(-1);
  });

  it("should set the message property if server return an error when adding todo", () => {
    let error = "error from server"
    spyOn(service, "add").and.returnValue(throwError(error));

    component.add();

    expect(component.message).toEqual(error);
  });

  it("should call the server to delete a todo if the user confirmed", () => {
    spyOn(window, "confirm").and.returnValue(true);
    spyOn(service, "delete").and.returnValue(empty());

    component.delete(1);

    // expect(service.delete).toHaveBeenCalled();
    expect(service.delete).toHaveBeenCalledWith(1);
  });

  it("should NOT call the server to delete a todo if the user cancelled", () => {
    spyOn(window, "confirm").and.returnValue(false);
    spyOn(service, "delete").and.returnValue(empty());

    component.delete(1);

    // expect(service.delete).toHaveBeenCalled();
    expect(service.delete).not.toHaveBeenCalled();
  });
});