import AreaEditor from "../Modals/AreaEditor";
import ObjectEditor from "../Modals/ObjectEditor";

import { listKey, keyList, lectureValidator } from "../../actions/helpers";

export const AreaEdit = (area, element) => {
  this.props.showModal(
    "content",
    <AreaEditor
      element={element}
      update={data => {
        this.switcher(area, "update")(element.id, data);
      }}
      delete={() => {
        this.switcher(area, "delete")(element.id);
      }}
    />
  );
};
export const ObjectEdit = (area, obj, element) => {
  this.props.showModal(
    "content",
    <ObjectEditor
      element={element}
      obj={obj}
      update={data => {
        this.switcher(keyList(area), "update")(element.id, data);
      }}
      delete={null}
    />
  );
};
export const deleter = (area, element) => {
  let deletor = null;
  deletor = this.switcher(area, "delete");
  if (deletor != null) {
    deletor(element.id);
  } else {
    console.log(deletor);
  }
};
