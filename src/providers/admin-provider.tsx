"use client";
import { getAllTagsAndPost } from "@/lib/getThings";
import React, { createContext, useReducer, Dispatch, useEffect } from "react";

export type Tag = {
  id: number;
  name: string;
  slug: string;
  description: string | null;
};

export type Post = {
  id: number;
  title: string;
  body: string;
  imageUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
  authorId: number;
  tagId: number;
  tag: Tag;
};

export type sendingDataProps = Tag & {
  posts: Post[];
  _count: {
    posts: number;
  };
};

type State = {
  posts: Post[];
  tag: Tag[];
  isLoading: boolean;
  allData: sendingDataProps[];
};

type Action =
  | { type: "SET_POSTS"; payload: Post[] }
  | { type: "DELETE_POST"; payload: number }
  | { type: "Add_POST"; payload: Post }
  | { type: "SET_CATEGORIES"; payload: Tag[] }
  | { type: "Add_CATEGORIES"; payload: Tag }
  | { type: "SET_ALLDATA"; payload: sendingDataProps[] }
  | { type: "SET_ISLOADING"; payload: boolean };

const initialState: State = {
  posts: [],
  tag: [],
  allData: [],
  isLoading: true,
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_POSTS":
      return { ...state, posts: action.payload };
    case "DELETE_POST":
      const updatedPostsList = state.posts.filter(
        (post) => post.id !== action.payload
      );
      return { ...state, posts: updatedPostsList };
    case "Add_POST":
      return { ...state, posts: [...state.posts, action.payload] };
    case "SET_CATEGORIES":
      return { ...state, tag: action.payload };
    case "Add_CATEGORIES":
      const alreadyExsits = state.tag.some(
        (tag) =>
          tag.id === action.payload.id &&
          tag.name === action.payload?.name &&
          tag.slug === action.payload?.slug
      );
      return {
        ...state,
        tag: alreadyExsits ? state.tag : [...state.tag, action.payload],
      };
    case "SET_ALLDATA":
      return {
        isLoading: false,
        tag: action.payload.map((tag) => ({
          id: tag.id,
          name: tag.name,
          slug: tag.slug,
          description: tag.description,
          _count: tag._count,
        })),
        posts: action.payload.map((tag) => tag.posts).flat(),
        allData: action.payload,
      };
    case "SET_ISLOADING":
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
};

const AdminContext = createContext<{
  state: State;
  dispatch: Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

export const AdminProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AdminContext.Provider value={{ state, dispatch }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdminContext = () => {
  const context = React.useContext(AdminContext);
  if (!context) {
    throw new Error("useAdminContext must be used within an AdminProvider");
  }
  return context;
};

export const useLoadData = () => {
  const { dispatch } = useAdminContext();
  useEffect(() => {
    const helper = async () => {
      const allTagsAndPost: sendingDataProps[] = await getAllTagsAndPost();
      dispatch({ type: "SET_ALLDATA", payload: allTagsAndPost });
    };

    helper();
  }, []);
};
