<!doctype html>
<html lang="ko" >
<head>
	<title>sticky on table</title>
	<meta charset="utf-8">
	<meta http-equiv="Content-Script-Type" content="text/javascript">
	<meta http-equiv="Content-Style-Type" content="text/css">
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<link rel="shortcut icon" href="http://www.mins01.com/favicon.ico">
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />

	<script src="/js/ForGoogle.js"></script>
	<!-- google analytics -->
	<script>ForGoogle.analytics()</script>


	<!-- jquery 관련 -->
	<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" crossorigin="anonymous"></script>


	<!-- 부트스트랩 4 : IE8지원안됨! -->
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" crossorigin="anonymous">
	<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" crossorigin="anonymous"></script>
	<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" crossorigin="anonymous"></script>
	<!-- vue.js -->
	<script src="https://cdn.jsdelivr.net/npm/vue"></script>

	<!-- meta og -->

	<meta property="og:title" content="fixed frame on table">
	<meta property="og:description" content="fixed frame on table">
	<meta name="og:image" content="http://www.mins01.com/img/logo.gif">
	<meta property="og:image:width" content="190">
	<meta property="og:image:height" content="70" />
	<meta property="og:site_name" content="fixed frame on table" />
	<meta property="og:type" content="website">
	<!-- //meta og -->

	<script src="StickyOnTable.js"></script>
	<link rel="stylesheet" href="stickyOnTable.css">

	<script>
	window.onresize = function(){
		// StickyOnTable.apply(document.querySelector("#sot8"))
		// StickyOnTable.apply(document.querySelector("#sot9"))
		// StickyOnTable.apply(document.querySelector("#sot10"))

	}
	window.onload = function(){
		let t;
		t = performance.now()
		StickyOnTable.apply(document.querySelector("#sot2"))
		console.log('100x100 time',performance.now()-t);
		t = performance.now()
		StickyOnTable.apply(document.querySelector("#sot3"))
		console.log('200x100 time',performance.now()-t);
		t = performance.now()
		StickyOnTable.apply(document.querySelector("#sot4"))
		console.log('200x200 time',performance.now()-t);
	};
	function test(){
		let icnt = 0 , t, table;
		t = performance.now()
		document.querySelectorAll("#sot2 > table > * > tr >td,#sot2 > table > * > tr >th").forEach((td, i) => {
			icnt+=td.colSpan;
		});
		;
		console.log('time',performance.now()-t,icnt);
		icnt = 0;
		t = performance.now()
		table = document.querySelector("#sot2 > table");
		for(const tr of table.rows){
			for(const td of tr.cells){
				icnt+=td.colSpan;
			}
		}
		console.log('time',performance.now()-t,icnt);
	}
	</script>

	<style>
	.sot-top{
		background-color: #abc !important;
	}
	.sot-left{
		background-color: #cba !important;
	}
	.sot-top.sot-left{
		background-color: #caa !important;
	}
	</style>
</head>
<body>
	<div class="container">
		<h1>sticky on table</h1>
		<div>
			안내
			<ul>
				<li>큰 table 테스트용</li>
			</ul>

		</div>

		<hr>

		<div class="my-3">
			<h3 class="text-center">100x100</h3>
			<div id="sot2" class="sot" data-sot-top="2" data-sot-left="2"  style="width:300px; height:300px; margin:0 auto;">
				<table>
					<?
					for($i0=0,$m0=100;$i0<$m0;$i0++):
						?>
						<tr>
							<?
							for($i=0,$m=100;$i<$m;$i++):
								?>
								<td width="50" height="50"><?=$i?></td>
								<?
							endfor;
							?>
						</tr>
						<?
					endfor;
					?>
				</table>
			</div>
			<h3 class="text-center">200x100</h3>
			<div id="sot3" class="sot" data-sot-top="2" data-sot-left="2"  style="width:300px; height:300px; margin:0 auto;">
				<table>
					<?
					for($i0=0,$m0=200;$i0<$m0;$i0++):
						?>
						<tr>
							<?
							for($i=0,$m=100;$i<$m;$i++):
								?>
								<td width="50" height="50"><?=$i?></td>
								<?
							endfor;
							?>
						</tr>
						<?
					endfor;
					?>
				</table>
			</div>
			<h3 class="text-center">200x200</h3>
			<div id="sot4" class="sot" data-sot-top="2" data-sot-left="2"  style="width:300px; height:300px; margin:0 auto;">
				<table>
					<?
					for($i0=0,$m0=200;$i0<$m0;$i0++):
						?>
						<tr>
							<?
							for($i=0,$m=200;$i<$m;$i++):
								?>
								<td width="50" height="50"><?=$i?></td>
								<?
							endfor;
							?>
						</tr>
						<?
					endfor;
					?>
				</table>
			</div>
		</div>
	</div>
</body>
</html>
