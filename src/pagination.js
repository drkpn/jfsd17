import React from "react";
import {callApi} from './main';

class Pagination extends React.Component
{
    constructor()
    {
        super();
        this.state = {
            pageSelected : 1,
            pages: [],
            tableData: []
        };

        this.loadData = this.loadData.bind(this);
        this.generateTable = this.generateTable.bind(this);
        this.generatePages = this.generatePages.bind(this);
    }

    componentDidMount()
    {
        this.loadData(1);
    }

    loadData(cpage){
		//pageSelected = cpage;
        this.setState({pageSelected : cpage});
		
		var dataurl = "http://13.201.19.45:8080/pagination/student/getstudents/"+ cpage +"/15";
		callApi("GET", dataurl, "", this.generateTable);
		
		var pageurl = "http://13.201.19.45:8080/pagination/student/getpages/15";
		callApi("GET", pageurl, "", this.generatePages);
	}


    generateTable(res){
		var data = JSON.parse(res);
        this.setState({tableData : data});
	}

	generatePages(res){
		var data = JSON.parse(res);
        this.setState({pages : data});
	}

    render()
    {
        const {pageSelected, pages, tableData} = this.state;
        return(
            <div className="fullPage">
                <div id="content">
                    <table className="tbl">
                        <tr>
                        	<th className='ch1'>Roll No</th>
		 			 		<th className='ch2'>Student Name</th>
		 			 		<th className='ch3'>Department</th>
		 			 		<th></th>
                        </tr>
                        {tableData.map((row)=>(
                            <tr>
                                <td className="cd1">{row.rollno}</td>
                                <td className="cd2">{row.name}</td>
                                <td className="cd3">{row.dept}</td>
                                <td></td>
                            </tr>
                        ))}
                    </table>
                </div>
                <div id="footer">
                    {pages.map((cpage)=>(
                        <label className={pageSelected === cpage ? "pageno-selected" : "pageno"}
                            onClick={()=>this.loadData(cpage)} >{cpage}</label>
                    ))}
                </div>
            </div>
        );
    }
}

export default Pagination;