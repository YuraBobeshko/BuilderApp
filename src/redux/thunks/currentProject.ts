import {AppDispatch} from "../store";
import {ITree} from "../../types";
import {ProjectActions} from "../actions/currentProject";

export async function setСurrentProject(dispatch: AppDispatch, data: ITree) {
    dispatch(ProjectActions.setCurrentProjectsStructure(data));
    return data;
}

