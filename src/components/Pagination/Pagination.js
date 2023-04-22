import {Select} from "../Select/Select";

const Pagination = ({cards, valueSelect, amountBtn, setValueSelect, onClickBtnPag, loading}) => {

  let style;
  if (loading) {
    style = "begin-state";
  }

  return (
    <div className={`pagination-block ${style}`}>
      <Select setValueSelect={setValueSelect} valueSelect={valueSelect}/>
      <div>
        <nav>
          <ul className="pagination-block__list pagination">
            {
              cards ? cards.map((card, i) => {
                if (i < amountBtn) {
                  return (
                    <li key={++i} className="pagination-block__list-item page-item" aria-current="page">
                      <button onClick={(e) => onClickBtnPag(+e.target.textContent)} className="page-link">{++i}</button>
                    </li>
                  )
                }
              }) : null
            }
          </ul>
        </nav>
      </div>
    </div>
  );
}

export {Pagination};
