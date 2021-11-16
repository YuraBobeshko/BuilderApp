import React, {useCallback, useEffect, useMemo} from "react";
import {useSelector, useDispatch} from "react-redux";
import {useParams} from "react-router-dom";

import {TreeRenerer, Downloader, Uploader} from "../../components";
import {IGetStructure, IProject} from "../../types";
import {defaultTree} from "../../constants";
import {updateListProject} from "../../redux/thunks";

function Structure() {
    const {currentId} = useParams<{ currentId: string | undefined }>();
    const dispatch = useDispatch();
    const project = useSelector((state) =>
        state.listProject.find((project) => project.id === currentId)
    ) as IProject;

    const tree = useMemo(
        () =>
            project?.structure || []
        ,
        [project?.structure],
    );
    const setTree = useCallback(
        (structure: IGetStructure) => {
            updateListProject(dispatch,{...project, structure: structure(tree)}).then()
        }
        ,
        [dispatch, project, tree],
    );

    useEffect(() => {
        setTree(() => defaultTree);
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
