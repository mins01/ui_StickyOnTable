var StickyOnTable = {
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
		let rowCellCounts = this.setDataIdxforTable(table)
		this.reset(ta);
		let conf = Object.assign(this.getConfig(ta),rowCellCounts);
		conf.left = Math.min(conf.left,conf.cellCount)
		conf.top = Math.min(conf.top,conf.rowCount)
		// console.log(conf);
		this.applySticky(ta,conf);
	},
	"reset":function(ta){
		ta.querySelectorAll(':scope > table > * > tr').forEach((tr, i) => {
			for(const td of tr.cells ){
				td.classList.remove('sot-top','sot-left','sot-right','sot-bottom')
				td.style.top = null;
				td.style.left = null;
				td.style.right = null;
				td.style.bottom = null;
			}
		});
	},
	"setDataIdxforTable":function(table){
		let rowCount = table.rows.length;
		let cellCount = 0;
		table.querySelectorAll(':scope > * > tr').forEach((tr, i) => {
			let sum = 0;
			for(let i=0,m=tr.cells.length;i<m;i++){
				sum+=tr.cells[i].colSpan;
				tr.cells[i].removeAttribute('data-row-idx');
				tr.cells[i].removeAttribute('data-cell-idx');
			}
			cellCount = Math.max(cellCount,sum)
		});
		// console.log(rowCount,cellCount);
		let arr = new Array(rowCount*cellCount);
		table.querySelectorAll(':scope > * > tr').forEach((tr, i) => {
			let st = tr.rowIndex * cellCount;
			for(let td of tr.cells){
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
		});
		let dri = 0,dci=0,td;
		for(let i=0,m=arr.length;i<m;i++){
			td = arr[i];
			dri = Math.floor(i/cellCount);
			dci = i%cellCount;
			if(td.hasAttribute('data-row-idx')){
				continue;
			}
			td.setAttribute('data-row-idx',dri)
			td.setAttribute('data-cell-idx',dci)
		}
		return {rowCount:rowCount,cellCount:cellCount}
	},
	"applySticky":function(ta,conf) {
		let table = ta.querySelector(':scope > table');

		if(ta.scrollWidth > ta.offsetWidth ){
			table.style.width="100%";
		}else{
			table.style.width="auto";
		}
		let rectTable = table.getBoundingClientRect();
		for(let i2=0,m2=conf.top;i2<m2;i2++){

			table.querySelectorAll(':scope > * > tr:nth-child('+(i2+1)+') > td , :scope > * > tr:nth-child('+(i2+1)+') > th').forEach((td, i) => {
				let rectTd = td.getBoundingClientRect();
				let top = rectTd.top - rectTable.top;
				td.classList.add('sot-top');
				td.style.top = top+'px';
			});

		}
		for(let i2=0,m2=conf.left;i2<m2;i2++){
			table.querySelectorAll(':scope > * > tr > td[data-cell-idx="'+i2+'"] , :scope > * > tr > th[data-cell-idx="'+i2+'"]').forEach((td, i) => {
				let rectTd = td.getBoundingClientRect();
				let left = rectTd.left - rectTable.left;
				td.classList.add('sot-left');
				td.style.left = left+'px';
			});
		}
	}


}
