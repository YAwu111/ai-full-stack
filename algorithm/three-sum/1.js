function threeSum(nums){
// 先排序
    // sort 是 js 内置的 排序函数
    const ans = [];
    nums.sort((a,b) => a-b);
    for(let i=0;i<nums.length;i++){
        if(nums[i] === nums[i-1] && i !== 0){
            continue;
        }
        let left = i+1;
        let right = nums.length -1;
        while(left<right){
            let sum = nums[i] + nums[left] + nums[right];
            if(sum === 0){
                if(nums[left] === nums[left-1]&&nums[right] === nums[right+1]&&right<nums.length -1){
                    left++;
                    right--;
                    continue;
                }
                ans.push([nums[i],nums[left],nums[right]]);
                left++;
                right--;
            }else{
                if(sum>0){
                    right--;
                }
                else{
                    left++;
                }
            }
        }
    }
    return ans;
}