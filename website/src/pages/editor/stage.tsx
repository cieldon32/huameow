import React, {useState} from 'react';
import  * as Huameow from '@huameow/ui';
import './style.css';


export default function Stage(): JSX.Element {
  const [list, setList] = useState([]);
  function doDrop(e: any) {
    e.preventDefault();
    const data = e.dataTransfer.getData("data");
    setList((res) => res.concat([JSON.parse(data)]))
  }
  function allowDrop(e: any) {
    e.preventDefault();
  }
  return (
    <div className='stage' onDrop={doDrop} onDragOver={allowDrop}>
      <div className='wrap'>
        {
          list.map((item) => {
            const Com = Huameow[item.Com];
            console.log('item', item)
            return (
              <div key={item.name}>
                <Com {...item.props}>{item.name}</Com>

              </div>
            )
          })
        }
      </div>
    </div>
  );
}
