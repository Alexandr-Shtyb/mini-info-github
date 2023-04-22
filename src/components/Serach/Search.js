import BtnSearch from "../../resources/img/btn-search.svg";

const Search = ({onClickSearch, value, setValue}) => {

  return (
    <form className={"search"} onSubmit={(e) => {
      e.preventDefault();
      onClickSearch(value);
    }}>
      <input onChange={(e) => setValue(e.target.value)}
             value={value}
             className={"search__input"}
             placeholder={'Начните' +
      ' вводить' +
      ' текст для поиска (не менее трех символов)'}
             type="text"/>
      <button className={"search__btn"}>
        <img src={BtnSearch} alt="Иконка поиска"/>
      </button>
    </form>
  );
}

export {Search};
