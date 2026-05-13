function twoSum(nums,target){
    // es6 中提供了部分数据结构
    const hash = new Map();
    const len = nums.length;
    for(let i=0;i<len;i++){
        const complement = target - nums[i];
        if(hash.has(complement)){
            return [hash.get(complement),i];
        }
        hash.set(nums[i],i);
    }
}