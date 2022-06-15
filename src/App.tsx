import React from 'react';
import Collapse from './Components/Collapse';
import Edit from './Edit';

export interface IBaseInfo {
  id: number,
  val1: string,
  val2: string,
  val3: string,
  subList: ITableObj[]
}

export interface ITableObj {
  checked: boolean,
  name: string,
  value: string
}

function App() {

  const [isListMode, setListMode] = React.useState<boolean>(true)
  const [isAddMode, setAddMode] = React.useState<boolean>(true)
  const [isDetailMode, setDetailMode] = React.useState<boolean>(true)
  const [list, setList] = React.useState<IBaseInfo[]>([{
    id: 1,
    val1: "test",
    val2: "testval",
    val3: "dummy",
    subList: []
  }])
  const [target, setTarget] = React.useState<IBaseInfo>()
  const update = (v: IBaseInfo) => {
    if (target == undefined) return;
    let index = list.findIndex(obj => obj.id == target.id)
    setList([
      ...list.slice(0, index),
      v,
      ...list.slice(index + 1)
    ]);
    setListMode(true);
  }
  const add = (v: IBaseInfo) => {
    if (list.findIndex(obj => obj.id == v.id) != -1) {
      alert("同じIDを持っているデータがあります");
      return;
    }
    setList([...list, v]);
    setListMode(true);
  }

  const goEditMode = (addMode: boolean, detailMode: boolean, target?: IBaseInfo) => {
    setListMode(false);
    setAddMode(addMode);
    setDetailMode(detailMode);
    if (target == undefined)
      setTarget({
        id: -1,
        val1: "",
        val2: "",
        val3: "",
        subList: []
      })
    else
      setTarget(target);
  }

  const back = ()=>{
    setListMode(true);
  }


  return (
    <>
      {isListMode || (target == undefined) ?
        (
          <>
            <table>
              <tr>
                <td>id</td>
                <td>val1</td>
                <td>val2</td>
                <td>val3</td>
                <td>menu</td>
              </tr>
              {
                list.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.id}</td>
                      <td>{item.val1}</td>
                      <td>{item.val2}</td>
                      <td>{item.val3}</td>
                      <td>
                        <button
                          onClick={() => goEditMode(false, false, list[index])}
                        >edit</button>
                        <button
                          onClick={() => goEditMode(true, false, list[index])}
                        >copy</button>
                        <button
                          onClick={() => goEditMode(false, true, list[index])}
                        >detail</button>
                      </td>
                    </tr>
                  );
                })
              }
            </table>
            <button onClick={() => goEditMode(true, false, {
              id: -1,
              subList: [],
              val1: "",
              val2: "",
              val3: ""
            })}>add</button>
          </>
        ) :
        (
          <div>
            <Edit
              baseInfo={target}
              save={isAddMode ? add : update}
              isAddMode={isAddMode}
              isDetailMode={isDetailMode}
              back={back}
            />
          </div>
        )
      }
    </>
  );
}

export default App;
