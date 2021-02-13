import React, { createContext, useEffect, useState } from "react";

export const Data = createContext();

export function Context(props) {
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");

  const [users, setData] = useState([]);

  const [posts, setPosts] = useState([]);

  const [singlePost, setSinglePost] = useState({});

  const [comments, setComments] = useState([]);

  const [theme, setTheme] = useState("light");

  useEffect(() => {
    setLoading(true);
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((json) => {
        setData(json);
        setTimeout(() => {
          setLoading(false);
        }, 1500);
      });
  }, []);

  const callingPostsbyUserId = (id) => {
    id = parseInt(id);
    setLoading(true);
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((json) => {
        const arr = json.filter((data) => data.userId === id);
        setPosts(arr);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      })
      .catch((err) => console.log(err));
  };

  const findSinglePost = (id) => {
    setLoading(true);
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((response) => response.json())
      .then((json) => {
        setSinglePost(json);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      })
      .catch((err) => console.log(err));
  };

  const loadComments = (id) => {
    fetch(`https://jsonplaceholder.typicode.com/comments?postId=${id}`)
      .then((response) => response.json())
      .then((json) => {
        setComments(json);
      })
      .catch((err) => console.log(err));
  };

  const ChangeTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  const onSearchBoxChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <Data.Provider
      value={{
        users,
        callingPostsbyUserId,
        posts,
        findSinglePost,
        singlePost,
        loadComments,
        comments,
        ChangeTheme,
        theme,
        onSearchBoxChange,
        search,
        loading,
      }}
    >
      {props.children}
    </Data.Provider>
  );
}
