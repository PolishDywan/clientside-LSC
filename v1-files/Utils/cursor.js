/// <reference types="@altv/types-client" />
/// <reference types="@altv/types-natives" />
import alt from 'alt-client';
import native from 'natives';

import view from './view.js'

class cursor {
    _cursor = false;
    constructor(){

    }

    openCursor(){
        if(this._cursor){
            view.focus();
        }
        else{
            this._cursor = true;
            view.focus();
            alt.showCursor(this._cursor);
        }
    }

    closeCursor(){
        if(!this._cursor){
            view.unfocus();
        }
        else{
            this._cursor = false;
            view.unfocus();
            alt.showCursor(this._cursor);
        }
    }

    getCursor(){
        return this._cursor;
    }
}

const Cursor = new cursor();

export default Cursor;