import { Observable, of } from "rxjs";
export class BaseService {
	public constructor() {}
	/**
	 * Handle Http operation that failed.
	 * Let the app continue.
	 * @param operation - name of the operation that failed
	 * @param result - optional value to return as the observable result
	 */
	public handleError<T>(operation = "operation", result?: T) {
		return (error: any): Observable<T> => {
			// TODO: better job of transforming error for user consumption
			this.log(`${operation} failed: ${error.message}`);

			// Let the app keep running by returning an empty result.
			return of(result as T);
		};
	}
	/** Log a HeroService message with the MessageService */
	public log(message: string) {
		//console.log(message); // log to console instead
	}
}
