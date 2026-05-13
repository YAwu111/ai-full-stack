function twoSum(nums,target){
    const hash = {};
    const len = nums.length;
    for(let i=0;i<len;i++){
        const complement = target - nums[i];
        if(hash[complement] !== undefined){
            return [hash[complement],i];
        }
        hash[nums[i]] = i;
    }
}