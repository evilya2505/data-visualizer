import { List, ListItem, Button } from "@mui/material";

import { useDispatch, useSelector } from "../../services/hooks";
import { setChoosenGraph } from "../../services/reducers/data";

import styles from "./menu.module.css";

function Menu() {
  const dispatch = useDispatch();

  const IbLength = useSelector((store) => store.data.dataIb).length;
  const UbLength = useSelector((store) => store.data.dataUb).length;

  function onButtonClick(type) {
    dispatch(setChoosenGraph(type));
  }
  return (
    <List className={styles.menu}>
      <ListItem className={styles.listItem}>
        <Button
          className={styles.button}
          disabled={UbLength === 0}
          variant="outlined"
          onClick={(e) => onButtonClick("uk")}
        >
          График Uk
        </Button>
      </ListItem>
      <ListItem className={styles.listItem}>
        <Button
          className={styles.button}
          disabled={IbLength === 0}
          variant="outlined"
          onClick={(e) => onButtonClick("ik")}
        >
          График Ik
        </Button>
      </ListItem>

      <ListItem className={styles.listItem}>
        <Button
          className={styles.button}
          disabled={IbLength === 0}
          variant="outlined"
          onClick={(e) => onButtonClick("spectrum")}
        >
          Спектр сигнала
        </Button>
      </ListItem>

      <ListItem className={styles.listItem}>
        <Button
          className={styles.button}
          disabled={IbLength === 0 || UbLength === 0}
          variant="outlined"
          onClick={(e) => onButtonClick("p")}
        >
          График мгновенных мощностей
        </Button>
      </ListItem>

      <ListItem className={styles.listItem}>
        <Button
          className={styles.button}
          disabled={IbLength === 0 || UbLength === 0}
          variant="outlined"
          onClick={(e) => onButtonClick("s")}
        >
          График полных мощностей
        </Button>
      </ListItem>
    </List>
  );
}

export default Menu;
