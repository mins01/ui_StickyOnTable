'use strict';

const StickyOnTable = {
	"getConfig":function(ta){
		let left = ta.getAttribute('data-sot-left');
		if(isNaN(left) || left == null){
			left = 0;
		}else{
			left = parseInt(left,10);
		}
		let top = ta.getAttribute('data-sot-top');
		if(isNaN(top) || top == null){
			top = 0;
		}else{
			top = parseInt(top,10);
		}
		let right = ta.getAttribute('data-sot-right');
		if(isNaN(right) || right == null){
			right = 0;
		}else{
			right = parseInt(right,10);
		}
		let bottom = ta.getAttribute('data-sot-bottom');
		if(isNaN(bottom) || bottom == null){
			bottom = 0;
		}else{
			bottom = parseInt(bottom,10);
		}
		return {
			top:top,
			left:left,
			right:right,
			bottom:bottom,
		}
	},
	"apply":function(ta){
		let table = ta.querySelector(':scope > table');
		if(!table){
			console.error("StickyOnTable.apply argument is invalid.");
			return;
		}
		let rowCellCounts = this.getRowCellCounts(table)
		this.setDataIdxforTable(table,rowCellCounts.rowCount,rowCellCounts.cellCount)
		this.reset(ta);
		let conf = Object.assign(this.getConfig(ta),rowCellCounts);
		conf.left = Math.min(conf.left,conf.cellCount)
		conf.top = Math.min(conf.top,conf.rowCount)
		this.applySticky(ta,conf);
	},
	"reset":function(ta){
		let table = ta.querySelector(':scope > table');
		if(!table){
			console.error("StickyOnTable.reset argument is invalid.");
			return;
		}
		for(const tr of table.rows){
			for(const td of tr.cells ){
				td.classList.remove('sot-top','sot-left','sot-right','sot-bottom')
				td.style.top = null;
				td.style.left = null;
				td.style.right = null;
				td.style.bottom = null;
			}
		};
	},
	"getRowCellCounts":function(table){
		let rowCount = table.rows.length;
		let cellCount = 0;
		let tr,td;
		for(const tr of table.rows){
			let sum = 0;
			for(const td of tr.cells){
				sum+=td.colSpan;
			}
			cellCount = Math.max(cellCount,sum)
		};
		return {rowCount:rowCount,cellCount:cellCount}
	},
	"setDataIdxforTable":function(table,rowCount,cellCount){
		let arr = new Array(rowCount*cellCount);
		for(const tr of table.rows){
			let st = tr.rowIndex * cellCount;
			for(const td of tr.cells){
				td.removeAttribute('data-row-idx');
				td.removeAttribute('data-cell-idx');
				while(st < arr.length && arr[st]!==undefined ){
					st++
				}
				if(st >= arr.length ){
					break;
				}
				arr[st] = td;
				for(let i=2,m=td.colSpan;i<=m;i++){
					arr[st+(i-1)] = td;
				}
				for(let i=2,m=td.rowSpan;i<=m;i++){
					arr[st+cellCount*(i-1)] = td;
				}
			}
		};
		for(let i=0,m=arr.length;i<m;i++){
			const td = arr[i];
			if(td.hasAttribute('data-row-idx')){
				continue;
			}
			td.setAttribute('data-row-idx',Math.floor(i/cellCount))
			td.setAttribute('data-cell-idx',i%cellCount)
		}
	},
	"applySticky":function(ta,conf) {
		let table = ta.querySelector(':scope > table');
		let rectTable = table.getBoundingClientRect();

		for(let i2=0,m2=conf.top;i2<m2;i2++){
			for(let td of table.rows[i2].cells){
				let rectTd = td.getBoundingClientRect();
				let top = rectTd.top - rectTable.top;
				td.classList.add('sot-top');
				td.style.top = top+'px';
			};
		}
		for(let i2=0,m2=conf.left;i2<m2;i2++){
			table.querySelectorAll(':scope td[data-cell-idx="'+i2+'"] , :scope th[data-cell-idx="'+i2+'"]').forEach((td, i) => {
				let rectTd = td.getBoundingClientRect();
				let left = rectTd.left - rectTable.left;
				td.classList.add('sot-left');
				td.style.left = left+'px';
			});
		}
	}


}
