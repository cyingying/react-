import React from 'react';
import ReactDom from 'react-dom';
import '../less/App.less';
import '../less/Cancle.less';
import '../less/Change.less';


var Table = React.createClass({
    onCancleFun:function(item) {
       this.props.onHandleCancleFun(item);
    },
    onChangFun: function(item) {
        this.props.onHandleChangFun(item);
    },
    render:function() {
        var data = this.props.data;
        var row = [];
        var self = this;
        data.forEach(function(item,index){
                 row.push(<tr key={index}>
                       <td>{item.ID}</td>
                       <td>{item.name}</td>
                       <td>{item.age}</td>
                       <td>{item.hiredate}</td>
                       <td>{item.position}</td>
                       <td>
                         <span onClick={self.onChangFun.bind(self,item)}>修改</span>
                         <span onClick={self.onCancleFun.bind(self,item)}>删除</span>
                       </td>
                    </tr>)
            
        })
        return (
            <table>
                  <thead>
                    <tr>
                       <td>ID</td>
                       <td>姓名</td>
                       <td>年龄</td>
                       <td>入职日期</td>
                       <td>职位</td>
                       <td>操作</td>
                    </tr>
                  </thead>
                  <tbody>
                      {row}
                  </tbody>
          </table>
        )
    }
})

var Cancle = React.createClass({
    getInitialState:function() {
      return {
          trueCancle:false
      }
    },
    onCancle:function(item,trueCancle) {
       var trueCancle = !(this.state.trueCancle);
       this.setState({
           trueCancle:trueCancle,
       })

    //    console.log(document.getElementsByTagName('input').value());
       
       this.props.onHandleCancle(item,trueCancle);
    },
    render:function() {
        var style = {};
        var showCancle = this.props.showCancle;
        showCancle ? style.display='block' : style.display='none';
        var item = this.props.item;
        return (
             <div className='warpper' style={style}>
                <span onClick={this.props.onCancleFun} className='span1'>x</span>               
                <div className='div1'><span>确定删除吗？</span></div>
                <div className='div2'>
                   <button onClick={this.props.onCancleFun}>取消</button>
                   <button onClick={this.onCancle.bind(this,item)}>删除</button>
                </div>
            </div>
        )
    }
})

var Change = React.createClass({
    getInitialState:function() {
       return {
           trueChange:false
       }
    },
    onTrueChange:function(item) {
       var trueChange = !trueChange;
       this.setState({
           trueChange:trueChange
       })
       this.props.onHandleTrueChange(trueChange);
    },
    render:function() {
        var style = {};
        var showChange = this.props.showChange;
        showChange ? style.display='block' : style.display='none';
        var item = this.props.item;
        var trueChange = this.state.trueChange;
        return (
            <div className='change' style={style}>
               <div>
                  <lable>ID:</lable><span>1</span>
               </div>
               <div>
                  姓名:<input type="text" placeholder={item.name}/>
               </div> 
               <div>
                   年龄:<input type="text" placeholder={item.age}/>
               </div>
               <div>
                    入职日期:<input type="text" placeholder={item.hiredate}/>  
               </div>
               <div>
                    职位:<input type="text" placeholder={item.position}/>
               </div>
               <div>
                   <input type="submit" value='确认' className='inp1' onClick={this.onTrueChange&&this.props.onChangeFun}/>
                   <button onClick={this.props.onChangeFun}>取消</button>
               </div>
            </div>
        )
    }
})

var App = React.createClass({
    getInitialState:function(){
       return {
           showCancle:false,
           showChange:false,
           item:'',
           cancle:false,
           trueCancle:'',
           focus:'',
           trueChange:'',
           filter:''
       }
    },
    onCancleFun:function(item,trueCancle) {
       var showCancle = !(this.state.showCancle);
       this.setState({
           showCancle:showCancle,
           item:item,
           trueCancle:trueCancle
       })
     
       var newData = [];
       this.props.data.forEach(function(ele,index) {
          if(ele.ID !== item.ID) {
            newData.push(ele);
          }
       })   
       if(trueCancle){
          data = newData;
       }
    },
    onChangeFun:function(item) {
        var showChange = !(this.state.showChange);
        this.setState({
           showChange:showChange,
           item:item
        })
    },
    onHandleTrueChange:function(trueChange) {
        this.setState({
            trueChange:trueChange,
        })
        // console.log(item);
    },
    render:function() {
        return (
            <div>
                <Table data={data} trueCancle={this.state.trueCancle} showCancle={this.state.showCancle} onHandleCancleFun={this.onCancleFun} onHandleChangFun={this.onChangeFun}></Table>
                <Cancle item={this.state.item} showCancle={this.state.showCancle} onCancleFun={this.onCancleFun} onHandleCancle={this.onCancleFun}></Cancle>
                <Change trueChange={this.state.trueChange} item={this.state.item} onHandleTrueChange={this.onHandleTrueChange} showChange={this.state.showChange} onChangeFun={this.onChangeFun} onHandleFocusFun={this.onHandleFocusFun}></Change>
            </div>
        )
    }
})

var data = [
    {
      "ID":1,
      "name":"张三",
      "age":23,
      "hiredate":"2016-09-10",
      "position":"前端工程师",
    },
    {
      "ID":2,
      "name":"李四",
      "age":22,
      "hiredate":"2016-10-10",
      "position":"java工程师",
    },
    {
      "ID":3,
      "name":"yingying",
      "age":18,
      "hiredate":"2017-03-10",
      "position":"前端实习生",
    }
]

ReactDom.render(
    <App data={data}/>,
    document.getElementById('root')
)