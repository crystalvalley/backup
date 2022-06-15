import React from 'react';
import { IBaseInfo, ITableObj } from './App';
import Collapse from './Components/Collapse';

interface IProps {
    baseInfo: IBaseInfo,
    isAddMode : boolean,
    isDetailMode : boolean,
    save: (v: IBaseInfo) => void
    back:()=>void
}

function Edit(props: IProps) {


    const [showMode, toggle] = React.useState<boolean>(props.isDetailMode);
    const [baseData, setBaseData] = React.useState<IBaseInfo>(props.baseInfo)
    const [datas, setDatas] = React.useState<ITableObj[]>(props.baseInfo.subList);

    const toggleCheck = (index: number) => {
        setDatas(datas => {
            return [
                ...datas.slice(0, index),
                {
                    checked: !datas[index].checked,
                    name: datas[index].name,
                    value: datas[index].value
                },
                ...datas.slice(index + 1)
            ];
        })
    }


    const addItem = () => {
        setDatas([...datas, {
            checked: false,
            name: "name" + datas.length,
            value: "value" + datas.length
        }])
    }

    const delItems = () => {
        setDatas(datas.filter(item => {
            return !item.checked
        }))

    }
    return (
        <>
            <button onClick={() => {
                toggle(!showMode)
            }}>
                {showMode ? "編集" : "参照"}
            </button>
            <Collapse isOpen={true}>
                <div style={{
                    marginLeft: "12px"
                }}>
                    <Collapse isOpen={true}>
                        <>
                            <div>入力情報</div>
                            <div>
                                <span>id : </span>{showMode||(!props.isAddMode) ? <span>{baseData.id}</span> :
                                    <input
                                        onChange={e => {
                                            setBaseData({
                                                ...baseData,
                                                id: parseInt(e.target.value)
                                            })
                                        }}
                                        type="text" value={baseData.id}
                                    />
                                }
                            </div>
                            <div>
                                <span>val1 : </span>{showMode ? <span>{baseData.val1}</span> :
                                    <input
                                        onChange={e => {
                                            setBaseData({
                                                ...baseData,
                                                val1: e.target.value
                                            })
                                        }}
                                        type="text" value={baseData.val1}
                                    />
                                }
                            </div>
                            <div>
                                <span>val2 : </span>{showMode ? <span>{baseData.val2}</span> :
                                    <input
                                        onChange={e => {
                                            setBaseData({
                                                ...baseData,
                                                val2: e.target.value
                                            })
                                        }}
                                        type="text" value={baseData.val2}
                                    />
                                }
                            </div>
                            <div>
                                <span>val3 : </span>{showMode ? <span>{baseData.val3}</span> :
                                    <input
                                        onChange={e => {
                                            setBaseData({
                                                ...baseData,
                                                val3: e.target.value
                                            })
                                        }}
                                        type="text" value={baseData.val3}
                                    />
                                }
                            </div>
                        </>
                    </Collapse>
                    <div>
                        <div>テーブル</div>
                        <Collapse isOpen={true}>
                            <div style={{ marginLeft: "12px" }}>
                                <button
                                    disabled={showMode}
                                    onClick={e => addItem()}
                                >add</button>
                                <button
                                    disabled={showMode}
                                    onClick={e => delItems()}
                                >del</button>
                                <table>
                                    <tr>
                                        <td>check</td>
                                        <td>name</td>
                                        <td>value</td>
                                    </tr>
                                    {
                                        datas.map((d, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>
                                                        <input
                                                            disabled={showMode}
                                                            onChange={e => toggleCheck(index)}
                                                            checked={d.checked}
                                                            type="checkbox" />
                                                    </td>
                                                    <td>
                                                        {d.name}
                                                    </td>
                                                    <td>
                                                        {d.value}
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    }
                                </table>
                            </div>
                        </Collapse>
                    </div>
                </div>
            </Collapse >
            <button onClick={() => {
                props.save({
                    ...baseData,
                    subList:datas
                })
            }}>save</button>
            <button onClick={props.back}>back</button>
        </>
    );
}

export default Edit;
