import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../App.css';
import CommonLayout from '../layout';
import { useApi } from '../../contexts/ApiContext';
import ConjInputBox from '../../components/ConjInputBox/ConjInputBox';
import ConjTestBox from '../../components/ConjTestBox/ConjITestBox';
import ConjSpanBox from '../../components/ConjSpanBox/ConjSpanBox';

const dummyUsers = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' },
  { id: 3, name: 'Charlie', email: 'charlie@example.com' },
];

function MainPage() {
  const api = useApi();

  // useNavigateフックを呼び出す
  const navigate = useNavigate();
  const [selectedUser, setSelectedUser] = useState<string>('');
  const [users, setUsers] = useState<typeof dummyUsers>([]);
  const [usersFromDB, setUsersFromDB] = useState<string[]>( [] );

  useEffect(() => {
    const fetchUsers = async () => {
      const tmp = await api.getUsers();
      //console.log( data[0][ "name" ] as string );
      const usr = tmp.map( (data) => {
        return data[ "name" ];
      });
      setUsersFromDB( usr );
    };
    fetchUsers();
    setUsers(dummyUsers);
  }, []);

  // セレクトボックスの変更イベントハンドラ
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const userId = event.target.value;
    setSelectedUser(userId);
    // 選択値が変更されたら即座に遷移
    if (userId) {
      navigate(`/users/${userId}`);
    }
  };

  const conjInput_input = (  langId: number, verbId: number, conjId:number, conjText: string  ) => {
    console.log( langId + ", " +  verbId + ", " + conjId + " = " + conjText );
  }

  const conjTest_input = ( isCorrect: boolean ) => {
    if( isCorrect ){
      console.log("OK");
    }else{
      console.log("OUT");
    }
  }

  return (
    <CommonLayout>
      <div>
        <ConjInputBox langId={1} verbId={1} conjId={1} person={"nosotros"} onInput={conjInput_input} />
        <ConjTestBox person={"nosotros"} answer={"vamos"} onInput={conjTest_input} />
        <ConjSpanBox person={"nosotros"} conjText={"vamos"} />




        <h1>Vite + React</h1>

        <h2>ユーザー詳細へ移動</h2>
        <select onChange={handleSelectChange} value={selectedUser}>
          <option value="">ユーザーを選択してください</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>{user.name}</option>
          ))}
        </select>

        <select>
          {usersFromDB.map( (users, idx) => {
            return <option key={idx}>{users}</option>
          })}
        </select>
      </div>
    </CommonLayout>
  );
}

export default MainPage;
