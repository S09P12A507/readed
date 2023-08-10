export async function getMemberProfile(memberId: number) {
  return (
    await fetch(`http://3.38.252.22/api/members/profile/${memberId}`)
  ).json();
}
