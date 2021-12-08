import React, {useCallback, useEffect, useMemo} from "react";
import {useSelector, useDispatch} from "react-redux";
import {TreeRenerer, Downloader, Uploader} from "../../components";
import {IGetStructure, IProject} from "../../types";
import {defaultTree} from "../../constants";
import {setСurrentProject} from "../../redux/thunks/currentProject";

function Structure() {
    const dispatch = useDispatch();
    const project = useSelector((state) => state.currentProject) as IProject;

    const tree = useMemo(
        () => project?.structure || [],
        [project?.structure],
    );

    const setTree = useCallback(
        (callBack: IGetStructure) => {
            setСurrentProject(dispatch, callBack(tree)).then()
        },
        [dispatch, tree],
    );

    useEffect(() => {
      if(project) setTree(() => defaultTree);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return (
        <>
            <TreeRenerer tree={tree} setTree={setTree}/>
            <Downloader tree={tree}/>
            <Uploader setTree={setTree}/>
        </>
    );
}

export default Structure;
