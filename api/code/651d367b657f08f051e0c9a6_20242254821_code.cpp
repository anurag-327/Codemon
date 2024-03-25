#include<bits/stdc++.h>
using namespace std;
void ip();
int Max(int n,vector<int> &nums);
int main()
{
    ip();
    int n;
    cin>>n;
    vector<int> nums(n);
    for(int i=0;i<n;i++)
    cin>>nums[i];
    int maxi=Max(n,nums);
    cout<<maxi;
}
void ip()
        {
            freopen("./code/651d367b657f08f051e0c9a6_20242254821_input.txt","r",stdin);  
        }
int Max(int n,vector<int> &nums)
{
    // write your code here
    sort(nums.begin(),nums.end());
    return nums[nums.size()-];
}