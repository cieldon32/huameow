import {useEffect, useState} from 'react';

export function useMenu({multiple = false, ...params}: any){
  const [value, setValue] = useState<string[]>(params.value || []);
  function doSelect(v: string){
    if(!value?.includes(v)){
      if(multiple) {
        setValue((result) => result.concat([v]));
      } else {
        setValue([v])
      }
    }
  }
  useEffect(() => {
    if(params.value) {
      setValue(params.value)
    }

  }, [params.value])
  return {
    value,
    doSelect
  }
}
