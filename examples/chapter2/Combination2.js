var MacroCommand = function(){
    return {
        commandsList:[],
        add: function( command ){
            this.commandsList.push( command );
        },
        execute: function(){
            for (let i = 0; i < this.commandsList.length; i++) {
                const command = this.commandsList[i];
                command.execute();
            }
        }
    }
};

var openTvCommand = {
    execute: function(){
        console.log( '打开电视' );
    },
    add: function(){
        throw new Error( '叶对象不能添加子节点' );
    }
};

var macroCommand1 = MacroCommand();
macroCommand1.add( openTvCommand );
openTvCommand.add( macroCommand1 ); // Uncaught Error: 叶对象不能添加子节点
