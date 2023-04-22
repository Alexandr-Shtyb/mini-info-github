import {useEffect, useCallback} from "react";

import {ReactComponent as BtnClose} from "../../resources/img/btn-close-notify.svg";

const Notification = ({toastlist, setList}) => {
  const deleteToast = useCallback(id => {
    const toastListItem = toastlist.filter(item => item.id !== id);
    setList(toastListItem);
  }, [toastlist, setList]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (toastlist.length) {
        deleteToast(toastlist[0].id);
      }
    }, 3000);

    return () => {
      clearInterval(interval);
    }
  }, [toastlist, deleteToast]);

  return (
    <div className="notification">
      {toastlist.map((toast, i) => (
        <div key={i} className={ "alert alert-info"}>
          <div>
            <button onClick={() => deleteToast(toast.id)}>
              <BtnClose/>
            </button>
          </div>
          <div>{toast.description}</div>
        </div>
      ))}
    </div>
  );
}

export {Notification};
