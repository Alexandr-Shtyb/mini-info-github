import {useEffect, useState} from "react";

import {ReactComponent as EditIcon} from "../../resources/img/edit-icon.svg";
import {ReactComponent as BtnDelete} from "../../resources/img/btn-delete.svg";
import Stars from "../../resources/img/stars.svg";
import Watchers from "../../resources/img/watchers.svg";


const CardList = ({resultArr, valueSelect, deleteUserInfo, arrDeleted, showToast, minIndexPage, currentPage, loading}) => {
  const [cards, setCards] = useState();

  useEffect(() => {
    if (!resultArr) return;
    setCards(resultArr.filter((item, i) => i < valueSelect * currentPage && i >= minIndexPage && !arrDeleted.includes(item.id)));
  }, [resultArr, valueSelect, minIndexPage]);

  if (loading) {
    return (
      <div className="spinner spinner-border text-primary" role="status">
        <span className="sr-only"></span>
      </div>
    );
  }

  return (
    <div className={"card-block"}>
      <ul className={"card-block__list"}>
        {cards ? cards.map(item => <Card key={item.id} item={item} deleteUserInfo={deleteUserInfo} showToast={showToast}/>) : null}
      </ul>
    </div>
  );
}

const Card = ({item, deleteUserInfo, showToast}) => {
  const [valueInput, setValueInput] = useState('');
  const [comment, setComment] = useState('');

  const onEdit = (valueInput, id) => {
    if (valueInput) {
      setComment(valueInput);
      localStorage.setItem(`${id}`, valueInput);
      setValueInput("");
      showToast(item.id, "edit");
    }
  }

  return (
    <li key={item.id} className={"card-block__list-item"}>
      <div className="card">
        <div className="card-block__name-proj">
          <a href={item.repo} target={"_blank"}>{item.nameProject}</a>
          <button onClick={() => {
            deleteUserInfo(item.id);
            showToast(item.id, "delete");
          }}>
            <BtnDelete/>
          </button>
        </div>
        <div className={"card-block__avatar-block"}>
          <img src={item.avatar} alt="avatar"/>
          <a href={item.urlUser} target={"_blank"}>{item.author}</a>
        </div>
        <div className={"card-block__stars-and-watchers"}>
          <div className={"card-block__stars-block"}>
            <img src={Stars} alt="stars"/>
            {item.stargazers}
          </div>
          <div className={"card-block__watchers-block"}>
            <img src={Watchers} alt="watchers"/>
            {item.watchers}
          </div>
        </div>
        <div className={"card-block__field-comment"}>
          Комментарий к проекту: {localStorage.getItem(`${item.id}`) || comment}
        </div>
        <div className={"card-block__field-editing"}>
          <input
            value={valueInput}
            onChange={(e) => setValueInput(e.target.value)}
            placeholder={"Введите комментарий"}
            type="text"/>
          <button className={"card-block__btn"}
                  onClick={() => {
                    onEdit(valueInput, item.id);
                  }}
          >
            <EditIcon/>
          </button>
        </div>
      </div>
    </li>
  );
}

export {CardList};
