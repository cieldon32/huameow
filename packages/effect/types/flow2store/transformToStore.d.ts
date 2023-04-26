import { Observable } from 'rxjs';
type Store = Record<string, Observable<any> | any>;
export declare function transformToStore(data: any, apis: any): Store;
export {};
//# sourceMappingURL=transformToStore.d.ts.map