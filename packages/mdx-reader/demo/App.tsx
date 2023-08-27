import React, { useState, BaseSyntheticEvent } from 'react';
import Mdict from '../src';

const slice = (file: File, start: number, len: number) => {
  const reader = new FileReader();
  reader.readAsArrayBuffer(file.slice(start, len));
  reader.onload = () => {
    console.log(start, len, reader.result)
  }
}

const App = () => {
  const [mdict, setMdict] = useState<Mdict>(null as unknown as Mdict);
  const [result, setResult] = useState<string>('');
  const onUpload = ({target}: BaseSyntheticEvent) => {
    const { files } = target;
    // const file = files[0]
    // slice(file, 0, 4);
    // slice(file, 4, 782);
    // slice(file, 782, 1866);
    // slice(file, 610905, 610937);
    // slice(file, 610937, 739993);
    const mdict = new Mdict(files);
    // const mdx$ = mdict.get<Observable<any>>('mdx')(mdict.resources);
    // const mdd$ = mdict.get<Observable<any>>('mdd')(mdict.resources);
    // mdx$?.subscribe((res) => console.log('mdx', res));
    // mdd$?.subscribe((res) => console.log('mdd', res));
    setMdict(mdict);
    // search('educate', mdict);
  }

  const search = (query: string, mdict: Mdict) => {
    const search$ = mdict.search(query);
    const sub = search$.subscribe({
      next({result, resource}: any) {
        console.log('onSearch', {result, resource})
        setResult(result);
      },
      error: (err: any) => {
        console.log('onSearch err', err)
      },
      complete: () => {
        sub.unsubscribe()
      },
    })
  }

  const onSearch = (e: any) => {
    const query = e.target.value;
    if(mdict){
      search(query, mdict);
    }
  }

  return (
    <div>
      <input type="file" onChange={onUpload} multiple={true} />
      {
        mdict ? (
          <input type="text" onChange={onSearch} />
        ) : null
      }
      <div dangerouslySetInnerHTML={{__html: result}}>
      </div>
    </div>
  )
};

export default App;
