import React, { useState, useEffect } from "react";
import download from "downloadjs";
import axios from "axios";
import { API_URL } from "../utils/constants";
import { makeStyles } from "@material-ui/core/styles";
import {
  GridList,
  GridListTile,
  GridListTileBar,
  IconButton,
} from "@material-ui/core";
import GetAppIcon from "@material-ui/icons/GetApp";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  titleBar: {
    background:
      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, " +
      "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
  },
  icon: {
    color: "white",
  },
}));

const FilesList = () => {
  const [search, setSearch] = useState("");
  const [filesList, setFilesList] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const getUploadsList = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/uploads`);
        setErrorMsg("");
        setFilesList(data);
      } catch (error) {
        error.response && setErrorMsg(error.response.data);
      }
    };

    getUploadsList();
  }, []);

  const downloadFile = async (id, path, mimetype) => {
    try {
      const result = await axios.get(`${API_URL}/download/${id}`, {
        responseType: "blob",
      });
      const split = path.split("/");
      const filename = split[split.length - 1];
      setErrorMsg("");
      return download(result.data, filename, mimetype);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMsg("Error while downloading file. Try again later");
      }
    }
  };

  const deleteFile = async (id) => {
    try {
      axios.delete(`${API_URL}/uploads/${id}`);
      window.location.reload();
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMsg("Error while deleting file. Try again later");
      }
    }
  };

  const classes = useStyles();

  return (
    <div className="files-container">
      {errorMsg && <p className="errorMsg">{errorMsg}</p>}
      <input
        className="search-bar"
        type="text"
        placeholder="search for an image"
        onChange={(e) => setSearch(e.target.value)}
      />
      <div>
        <GridList cellHeight={300} cols={4}>
          {filesList.length > 0 ? (
            filesList
              .filter((val) => {
                if (search == "") {
                  return val;
                } else if (
                  val.title.toLowerCase().includes(search.toLowerCase())
                ) {
                  return val;
                }
              })
              .map(({ _id, title, description, file_path, file_mimetype }) => (
                <GridListTile>
                  <img src={API_URL + "/" + file_path} alt={description} />
                  <GridListTileBar
                    title={title}
                    classes={{
                      root: classes.titleBar,
                    }}
                    subtitle={description}
                    actionIcon={
                      <div>
                        <IconButton
                          onClick={() =>
                            downloadFile(_id, file_path, file_mimetype)
                          }
                          className={classes.icon}
                        >
                          <GetAppIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => deleteFile(_id)}
                          className={classes.icon}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </div>
                    }
                  ></GridListTileBar>
                </GridListTile>
              ))
          ) : (
            <div className="no-images">
              No images were found! Please upload to view.
            </div>
          )}
        </GridList>
      </div>
    </div>
  );
};

export default FilesList;
