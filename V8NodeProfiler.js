var profiler=require('v8-profiler'),
	snapshot=profiler.takeSnapshot(),
	finalResult={};

snapshot.export(function(err,result) {
	var resultJson=JSON.parse(result),
		nodes=resultJson['snapshot']['meta']['node_types'][0],
		nodeMemOutput=resultJson['nodes'],
		obj={};

	console.log('\nNumber of Nodes : '+nodes.length+'\n');
	for(var i=0;i<nodeMemOutput.length;i+=6) 
		if(nodeMemOutput[i] in obj)
			obj[nodeMemOutput[i]]+=nodeMemOutput[i+3];
		else 
			obj[nodeMemOutput[i]]=nodeMemOutput[i+3];

	for (var i in obj) 
    if (obj.hasOwnProperty(i)) {
    	console.log(nodes[i]+' : '+obj[i])
    	finalResult[nodes[i]]=obj[i];
    }
});


module.exports.result=finalResult;