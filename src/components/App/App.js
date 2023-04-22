import {Search} from "../Serach/Search";
import {CardList} from "../CardList/CardList";
import {useEffect, useState} from "react";
import {GitHubServices} from "../../services/GitHubService";
import {Notification} from "../Notification/Notification";
import {Pagination} from "../Pagination/Pagination";

import '../../index.scss';

const App = () => {
  const service = GitHubServices();

  const [value, setValue] = useState(localStorage.getItem('search') || '');
  const [cards, setCards] = useState( JSON.parse(localStorage.getItem('cards')) || []);
  const [loading, setLoading] = useState(false);
  const [valueSelect, setValueSelect] = useState(+localStorage.getItem('valueSelect') || 10);
  const [amountBtn, setAmountBtn] = useState(0);
  const [currentPage, setCurrentPage] = useState(localStorage.getItem('numberPage') || 1);
  const [minIndexPage, setMinIndexPage] = useState(+localStorage.getItem('minIndexPage') || 0);
  const [arrDeleted, setArrDeleted] = useState(JSON.parse(localStorage.getItem('deleted')) || []);

  useEffect(() => {
    localStorage.setItem('valueSelect', `${valueSelect}`);
    localStorage.setItem('minIndexPage', `${minIndexPage}`);
    localStorage.setItem('deleted', JSON.stringify(arrDeleted));
    setAmountBtn(Math.ceil(cards.length / valueSelect));
  }, [cards, valueSelect, minIndexPage, arrDeleted]);

  const [list, setList] = useState([]);
  let toastProperties = null;

  const showToast = (id, type) => {
    switch (type) {
      case "delete":
        toastProperties = {
          id: list.length + 1,
          description: `Карточка ${id} удалена`
        }
        break;
      case "edit":
        toastProperties = {
          id: list.length + 1,
          description: `Карточка ${id} была отредактирована`
        }
        break;
    }
    setList([...list, toastProperties]);
  }

  const onClickSearch = async (subject) => {
    localStorage.setItem('search', subject);
    setLoading(true);
    const res = await service.getAllCards(subject).then(res => res);
    setLoading(false);
    localStorage.setItem('cards', JSON.stringify(res));
    setCards(res);
  }

  const deleteUserInfo = (id) => {
    setCards((cards) => cards.filter(item => item.id !== id));
    arrDeleted.push(id);
    setArrDeleted(arrDeleted);
    localStorage.setItem('deleted', JSON.stringify(arrDeleted));
  }

  const onClickBtnPag = (numberPage) => {
    localStorage.setItem('numberPage', numberPage);
    setMinIndexPage((numberPage * valueSelect) - valueSelect);
    setCurrentPage(numberPage);
  }

  return (
    <div className={"container"}>
      <Notification toastlist={list} setList={setList}/>
      <Search onClickSearch={onClickSearch} value={value} setValue={setValue}/>
      <main>
        <CardList resultArr={cards}
                  valueSelect={valueSelect}
                  deleteUserInfo={deleteUserInfo}
                  arrDeleted={arrDeleted}
                  showToast={showToast}
                  minIndexPage={minIndexPage}
                  currentPage={currentPage}
                  loading={loading}
        />
        <Pagination cards={cards}
                    valueSelect={valueSelect}
                    amountBtn={amountBtn}
                    setValueSelect={setValueSelect}
                    onClickBtnPag={onClickBtnPag}
                    loading={loading}
        />
      </main>
    </div>
  );
}

export default App;
