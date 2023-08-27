import {mergeMap, Observable, map, tap} from 'rxjs';
import {getExtension} from './utils';
import {parse} from './parse/index';
import {search} from './search/index';
import {resource} from './search/resource';

export type Resources = Record<string | number, Observable<File>> | Observable<File>[];
const defaultResource: Observable<File>[] = [];

class Mdict {
  resources: Resources = defaultResource;
  constructor(files: FileList) {
    this.resources = this.load(files);

  }
  get<T>(key: string) {
    return (resource: Resources): T | undefined => {
      return Reflect.get(resource, key);
    }
  }
  load(files: FileList) {
    return [...files].reduce((acc: Resources, file: File) => {
      const ext = getExtension(file.name, 'mdx');
      const observable$ = parse(file, ext);
      Object.assign(acc, {
        [ext]: observable$,
      });
      return acc;
    }, []);
  }
  search(query: string) {
    const mdx$ = this.get<Observable<any>>('mdx')(this.resources) || new Observable;
    const mdd$ = this.get<Observable<any>>('mdd')(this.resources);
    const search$ = search(mdx$, query);
    if(mdd$) {
      const resource$ = resource(mdd$, query);
      return search$.pipe(
        tap((res) => console.log('search', res)),
        mergeMap((res: any) => resource$.pipe(
          tap((data: any) => console.log('resource', data, Object.assign(res, {resource: data.resource}))),
          map(({resource}: any) => Object.assign(res, {resource}))
        ))
      );
    } else {
      return search$;
    }


  }
}

export default Mdict;
